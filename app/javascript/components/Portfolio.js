import React, { Component } from 'react'
import { url } from './config'

export class Portfolio extends Component {

    state = { ticker: "", qty: 0 }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo`)
            .then(res => res.json())
            .then(data => {
                let lastRefreshed = data['Meta Data']['3. Last Refreshed']
                let currentClosePrice = data['Time Series (5min)'][lastRefreshed]['4. close']
                fetch(`${url}/v1/transactions`, {
                    method: 'POST',
                    body: JSON.stringify({
                        user_id: this.props.user.user_info.id,
                        ticker: this.state.ticker,
                        qty: this.state.qty,
                        user_close: currentClosePrice,
                        current_close: currentClosePrice
                    }),
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.errors) {
                            alert(data.errors)
                        } else {
                            this.props.user.transactions.push(data)
                            this.props.updateAccountBalance(data.qty, data.user_close)
                        }
                    })
            })
    }

    render() {
        return (
            <div>
                <h1>Portfolio</h1>
                <p>Welcome {this.props.user.user_info.name}. Cash: {this.props.userAccountBalance}</p>
                <div className="login">
                    <form onSubmit={this.handleSubmit}>
                        <label>Ticker Symbol: </label>
                        <input type="text" name="ticker" placeholder="ticker" value={this.state.ticker} onChange={this.handleChange} />
                        <label>Qty (Positive Integers only) </label>
                        <input type="text" name="qty" placeholder="qty" value={this.state.qty} onChange={this.handleChange} />
                        <button>buy</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Portfolio
