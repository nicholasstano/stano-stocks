import React from 'react'

export default function TransactionCard(props) {
    //Card for Individual Transactions when a user buys a stock. 
    return (
        <div className="portfolioIndStock">
            <p>Buy ({props.t.ticker}) - {props.t.qty} @ {props.t.user_close}</p>
        </div>
    )
}
