import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'

export class HomeContainer extends Component {

    state = { login: true }

    toggleLoginRegister = () => {
        this.setState({ login: !this.state.login })
    }

    render() {
        return (
            <div>
                <h1>Welcome</h1>
                {this.state.login ? <button onClick={this.toggleLoginRegister}>Click to Register</button> : <button onClick={this.toggleLoginRegister}>Have an account already? Click to Login</button>}
                {this.state.login ? <Login user={this.props.user} setUser={this.props.setUser} /> : <Register user={this.props.user} setUser={this.props.setUser} />}
                <p>Login to view your stock portfolio or register to create your account.</p>
            </div>
        )
    }
}

export default HomeContainer
