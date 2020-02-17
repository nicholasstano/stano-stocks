import React from 'react'
import TransactionCard from './TransactionCard'

export default function Transactions(props) {
    let allTransactions = props.user.transactions.map(t => <TransactionCard t={t} key={t.id} />)
    return (
        <div className="transactions">
            <h1>Transactions</h1>
            {allTransactions}
        </div>
    )
}