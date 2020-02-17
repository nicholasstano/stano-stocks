import React, { Component } from 'react'
import TransactionCard from './TransactionCard'

export class Transactions extends Component {
    render() {
        let allTransactions = this.props.user.transactions.map(t => <TransactionCard t={t} key={t.id} />)
        return (
            <div className="transactions">
                <h1>Transactions</h1>
                {allTransactions}
            </div>
        )
    }
}

export default Transactions
