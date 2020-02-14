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
                    this.state.portfolio ? <Portfolio user={this.props.user} /> :
                        <Transactions user={this.props.user} />
                }
            </div >
        )
    }
}

export default UserContainer
