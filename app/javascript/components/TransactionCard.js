import React from 'react'

export default function TransactionCard(props) {
    console.log(props)
    return (
        <div>
            <p>Buy ({props.t.ticker}) - {props.t.qty} @ {props.t.user_close}</p>
        </div>
    )
}
