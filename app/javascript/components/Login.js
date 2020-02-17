import React, { Component } from 'react'
import { url } from './config'
import { withRouter } from 'react-router-dom'

export class Login extends Component {
    state = { email: "", password: "" }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()
        fetch(`${url}/login`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    alert(data.errors)
                    this.props.setUser(null)
                } else {
                    localStorage.setItem('token', data.token)
                    this.props.setUser(data.user)
                    this.props.history.push('/myportfolio')
                }
            })

        this.setState({
            email: '',
            password: ''
        })
    }

    render() {
        return (
            <div className="login">
                <h1>Sign IN</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="loginInputs form-group">
                        <input type="email" className="form-control" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
                        <input type="password" className="form-control" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                        <button className="btn btn-primary">Sign In</button>
                    </div>
                </form>

            </div>
        )
    }
}

export default withRouter(Login)
