import React, { Component } from 'react'

export class Portfolio extends Component {
    render() {
        return (
            <div>
                <h1>Portfolio</h1>
                <p>Welcome {this.props.user.name}. Your current balance is {this.props.user.account_balance}</p>
            </div>
        )
    }
}

export default Portfolio
