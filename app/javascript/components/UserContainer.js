import React, { Component } from 'react'
import Portfolio from './Portfolio'
import Transactions from './Transactions'

export class UserContainer extends Component {

    state = { portfolio: true }

    render() {
        return (
            <div>
                <h1>User Container</h1>
                <p onClick={() => this.props.setUser(null)}>LOG OUT</p>
                <p onClick={() => this.setState({ portfolio: true })}>Portfolio</p>
                <p>|</p>
                <p onClick={() => this.setState({ portfolio: false })}>Transactions</p>
                {
                    this.state.portfolio ? <Portfolio user={this.props.user} setUser={this.props.setUser} userAccountBalance={this.props.userAccountBalance} updateAccountBalance={this.props.updateAccountBalance} updatePortfolio={this.props.updatePortfolio} userPortfolio={this.props.userPortfolio} userPortfolioBalance={this.props.userPortfolioBalance} /> :
                        <Transactions user={this.props.user} />
                }
            </div >
        )
    }
}

export default UserContainer
