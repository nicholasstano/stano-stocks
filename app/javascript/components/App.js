import React from "react"
import { Switch, Route, withRouter } from 'react-router-dom'
import HomeContainer from './HomeContainer'
import UserContainer from './UserContainer'
import { url } from './config'

class App extends React.Component {

  state = { user: null }

  setUser = user => {
    if (user == null) {
      localStorage.removeItem('token')
    }
    this.setState({ user: user })
  }

  componentDidMount() {
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

  render() {
    console.log("APPSTATE USER", this.state.user)
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
                  <UserContainer user={this.state.user} setUser={this.setUser} />
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