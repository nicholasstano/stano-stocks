import React, { Component } from 'react'
import Portfolio from './Portfolio'
import Transactions from './Transactions'

export class UserContainer extends Component {

    state = { portfolio: true }

    // https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=GOOG&interval=5min&apikey=URO5UT82IEAW1NHV

    render() {
        return (
            <div>
                <h1>User Container</h1>
                <p onClick={() => this.props.setUser(null)}>LOG OUT</p>
                <p onClick={() => this.setState({ portfolio: true })}>Portfolio</p>
                <p>|</p>
                <p onClick={() => this.setState({ portfolio: false })}>Transactions</p>
                {
                    this.state.portfolio ? <Portfolio user={this.props.user} userAccountBalance={this.props.userAccountBalance} updateAccountBalance={this.props.updateAccountBalance} /> :
                        <Transactions user={this.props.user} />
                }
            </div >
        )
    }
}

export default UserContainer
