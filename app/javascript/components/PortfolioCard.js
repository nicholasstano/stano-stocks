import React from 'react'

export default function PortfolioCard(props) {
    return (
        <div>
            <p>{props.p.ticker} - {props.p.qty} Shares</p>
            <p>{props.p.total_price}</p>
        </div>
    )
}
