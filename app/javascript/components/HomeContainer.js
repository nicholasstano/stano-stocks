import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'

export class HomeContainer extends Component {

    state = { login: true }

    render() {
        return (
            <div>
                <h1>Welcome</h1>
                {this.state.login ? <Login setUser={this.props.setUser} /> : <Register />}
                <p>Login to view your stock portfolio or register to create your account.</p>
            </div>
        )
    }
}

export default HomeContainer
