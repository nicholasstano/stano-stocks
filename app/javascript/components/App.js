import React from "react"
import { Switch, Route, withRouter } from 'react-router-dom'
import HomeContainer from './HomeContainer'
import UserContainer from './UserContainer'
import { url } from './config'

class App extends React.Component {

  state = {
    user: null,
    userAccountBalance: null,
  }

  setUser = user => {
    if (user == null) {
      localStorage.removeItem('token')
      this.setState({ user: null, userAccountBalance: null })
    }
    else {
      this.setState({ user: user, userAccountBalance: user.user_info.account_balance })
    }
  }

  componentDidMount() {
    //autologin
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
          console.log("APP DATA", data)
          this.setUser(data)
          this.props.history.push('/myportfolio')
        })
    }
  }

  updateAccountBalance = (quantity, price) => {
    console.log(quantity, price)
    const stockAddTotalPrice = quantity * price
    this.setState({ userAccountBalance: this.state.userAccountBalance - stockAddTotalPrice })
  }

  // updateGameCard = (data) => {
  //   const newGameWeek = data.game
  //   let updatedWeek = this.state.selectedWeek.week_games.map(weekGame => weekGame.game_id === newGameWeek.game_id ? newGameWeek : weekGame)
  //   const newUpdatedWeek = { ...this.state.selectedWeek, week_games: updatedWeek }
  //   const newWeeklyGames = this.state.weeklyGames.map(wg => wg.id === this.state.selectedWeek.id ? newUpdatedWeek : wg)
  //   this.setState({ selectedWeek: newUpdatedWeek, weeklyGames: newWeeklyGames })
  // }

  render() {
    console.log("APPSTATE", this.state)
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
                  <UserContainer user={this.state.user} setUser={this.setUser} userAccountBalance={this.state.userAccountBalance} updateAccountBalance={this.updateAccountBalance} />
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