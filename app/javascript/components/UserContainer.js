import React, { Component } from 'react'
import Portfolio from './Portfolio'
import Transactions from './Transactions'

export class UserContainer extends Component {
    render() {
        return (
            <div>
                <h1>User Container</h1>
                <Portfolio user={this.props.user} setUser={this.props.setUser} />
                <Transactions user={this.props.user} setUser={this.props.setUser} />
            </div>
        )
    }
}

export default UserContainer
