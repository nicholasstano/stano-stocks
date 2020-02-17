import React, { Component } from 'react'
import Portfolio from './Portfolio'
import Transactions from './Transactions'

export class UserContainer extends Component {
    //State used to toggle between Portfolio or Transactions
    state = { portfolio: true }

    render() {
        return (
            <div className="userContainer">
                <div className="userNavBar">
                    <a className="userNavBarLink nav-link active" onClick={() => this.props.setUser(null)}>LOG OUT</a>
                    <a className="userNavBarLink nav-link active" onClick={() => this.setState({ portfolio: true })}>Portfolio</a>
                    <a className="userNavBarLink nav-link active" onClick={() => this.setState({ portfolio: false })}>Transactions</a>
                </div>
                {
                    this.state.portfolio ? <Portfolio user={this.props.user} setUser={this.props.setUser} userAccountBalance={this.props.userAccountBalance} updateAccountBalance={this.props.updateAccountBalance} updatePortfolio={this.props.updatePortfolio} userPortfolio={this.props.userPortfolio} userPortfolioBalance={this.props.userPortfolioBalance} /> :
                        <Transactions user={this.props.user} />
                }
            </div >
        )
    }
}

export default UserContainer
