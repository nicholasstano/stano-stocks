import React from 'react'

export default function TransactionCard(props) {
    return (
        <div className="portfolioIndStock">
            <p>Buy ({props.t.ticker}) - {props.t.qty} @ {props.t.user_close}</p>
        </div>
    )
}
