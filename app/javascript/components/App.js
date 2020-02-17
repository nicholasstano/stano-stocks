import React from "react"
import { Switch, Route, withRouter } from 'react-router-dom'
import HomeContainer from './HomeContainer'
import UserContainer from './UserContainer'
import { url } from './config'

class App extends React.Component {

  state = {
    user: null,
    userAccountBalance: null,
    userPortfolioBalance: null,
    userPortfolio: []
  }

  setUser = user => {
    if (user == null) {
      localStorage.removeItem('token')
      this.setState({ user: null, userAccountBalance: null, userPortfolio: [], userPortfolioBalance: null })
    }
    else {
      this.setState({ user: user, userAccountBalance: user.user_info.account_balance, userPortfolio: user.portfolio, userPortfolioBalance: this.updatePortfolioBalance() })
    }
  }



  componentDidMount() {
    //autologin feature if logout button is not pressed.
    this.autoLogin()
  }

  autoLogin() {
    let token = localStorage.getItem('token')
    if (token) {
      fetch(`${url}/autologin`, {
        headers: {
          'accept': 'application/json',
          Authorization: token
        }
      })
        .then(response => response.json())
        .then(data => {
          this.setUser(data)
          this.props.history.push('/myportfolio')
        })
    }
  }

  updateAccountBalance = (quantity, price) => {
    //used to render updated $Cash
    const stockAddTotalPrice = quantity * price
    this.setState({ userAccountBalance: this.state.userAccountBalance - stockAddTotalPrice })
  }

  updatePortfolio = () => {
    this.autoLogin()
    this.setState({ userPortfolioBalance: this.updatePortfolioBalance() })
  }

  updatePortfolioBalance = () => {
    let accountPerformance = 0
    if (this.state.user) {
      for (let stock of this.state.user.portfolio) {
        accountPerformance = accountPerformance + parseFloat(stock.total_price)
      }
    }
    return accountPerformance
  }

  render() {
    return (
      <div>
        <Switch>
          {this.state.user == null || this.state.user.errors ?
            <Route path='/' render={() => {
              return (
                <div>
                  <HomeContainer user={this.state.user} setUser={this.setUser} />
                </div>
              )
            }} /> :
            <Route path='/myportfolio' render={() => {
              return (
                <div>
                  <UserContainer user={this.state.user} setUser={this.setUser} userAccountBalance={this.state.userAccountBalance} updateAccountBalance={this.updateAccountBalance} updatePortfolio={this.updatePortfolio} userPortfolio={this.state.userPortfolio} userPortfolioBalance={this.state.userPortfolioBalance} />
                </div>
              )
            }} />
          }
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)