import React from "react"
import { Switch, Route, withRouter } from 'react-router-dom'
import HomeContainer from './HomeContainer'
import UserContainer from './UserContainer'
import { url } from './config'
import './App.css'

class App extends React.Component {
  //state for current user for login purposes as well as their balances to be rendered pessimistically when a user buys a new stock. User portfolio to edit when stock prices change. 
  state = {
    user: null,
    userAccountBalance: null,
    userPortfolioBalance: null,
    userPortfolio: []
  }
  //function to setUser. 
  setUser = user => {
    if (user == null) {
      localStorage.removeItem('token')
      this.setState({ user: null, userAccountBalance: null, userPortfolio: [], userPortfolioBalance: null })
    }
    else {
      this.setState({ user: user, userAccountBalance: user.user_info.account_balance, userPortfolio: user.portfolio, userPortfolioBalance: user.user_info.portfolio_balance })
    }
  }

  componentDidMount() {
    //autologin feature if logout button is not pressed.
    this.autoLogin()
  }
  //autologin function.
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
    //used to render updated Account Balance and Portfolio Balance after purchasing stocks.
    const stockAddTotalPrice = quantity * price
    this.setState({ userAccountBalance: this.state.userAccountBalance - stockAddTotalPrice, userPortfolioBalance: parseFloat(this.state.userPortfolioBalance) + stockAddTotalPrice })

  }
  //rerun login at times to refresh state after Intervals go off for prices of stock. 
  updatePortfolio = () => {
    this.autoLogin()
  }

  render() {
    return (
      <div>
        <Switch>
          {this.state.user == null || this.state.user.errors ?
            //redirect to home if there is no one logged in or if there was an error logged in.
            <Route path='/' render={() => {
              return (
                <div>
                  <HomeContainer user={this.state.user} setUser={this.setUser} />
                </div>
              )
            }} /> :
            //upon login redirect to portfolio page.
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