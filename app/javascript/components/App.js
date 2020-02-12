import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomeContainer from './HomeContainer'
import UserContainer from './UserContainer'

class App extends React.Component {

  state = { user: null }

  setUser = user => {
    this.setState({ user: user })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            {this.state.user == null ?
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
                    <UserContainer user={this.state.user} setUser={this.setUser} />
                  </div>
                )
              }} />
            }
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App