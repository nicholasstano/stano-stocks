import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'

export class HomeContainer extends Component {
    //state used to toggle between login and register
    state = { login: true }
    //Function for when user clicks register or login buttons.
    toggleLoginRegister = () => {
        this.setState({ login: !this.state.login })
    }

    render() {
        return (
            <div className="homeContainer">
                <h1>Welcome</h1>
                <p>Login to view your stock portfolio or register to create your account.</p>
                <p>Disclaimer: The Alpha Vantage free API key allows users to make 5 requests per minute. To avoid this, login, attempt to buy a stock that does not have a valid ticker symbol. Then buy a stock that you know has a valid ticker symbol.</p>
                {this.state.login ? <button className="btn btn-success" onClick={this.toggleLoginRegister}>Click to Register</button> : <button className="btn btn-primary" onClick={this.toggleLoginRegister}>Have an account already? Click to Login</button>}
                {this.state.login ? <Login user={this.props.user} setUser={this.props.setUser} /> : <Register user={this.props.user} setUser={this.props.setUser} />}
            </div>
        )
    }
}

export default HomeContainer
