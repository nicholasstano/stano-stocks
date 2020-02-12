import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginContainer from './LoginContainer'
import RegisterContainer from './RegisterContainer'
import Portfolio from './Portfolio'
import Transactions from './Transactions'

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/login' render={() => {
              return (
                <div>
                  <LoginContainer />
                </div>
              )
            }} />
            <Route path='/register' render={() => {
              return (
                <div>
                  <RegisterContainer />
                </div>
              )
            }} />
            <Route path='/portfolio' render={() => {
              return (
                <div>
                  <Portfolio />
                </div>
              )
            }} />
            <Route path='/transactions' render={() => {
              return (
                <div>
                  <Transactions />
                </div>
              )
            }} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App
