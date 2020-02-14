import React, { Component } from 'react'
import { url } from './config'
import { withRouter } from 'react-router-dom'

export class RegisterContainer extends Component {
    state = { email: "", password: "", name: "" }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()
        fetch(`${url}/v1/users`, {
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
            password: '',
            name: ''
        })
    }
    render() {
        return (
            <div className="login">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Email: </label>
                    <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
                    <label>Name: </label>
                    <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange} />
                    <label>Password: </label>
                    <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                    <button>register</button>
                </form>
            </div>
        )
    }
}

export default withRouter(RegisterContainer)
