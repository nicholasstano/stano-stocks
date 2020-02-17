import React, { Component } from 'react'
import { url } from './config'
import PortfolioCard from './PortfolioCard'

export class Portfolio extends Component {

    state = { ticker: "", qty: 0 }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    componentDidMount() {

    }

    updatePortfolioBalance = () => {
        fetch(`${url}/v1/users/${this.props.user.user_info.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.props.setUser(data.user)
            })
    }




    handleSubmit = e => {
        e.preventDefault()
        if (Number.isInteger(parseFloat(this.state.qty)) && parseInt(this.state.qty) > 0) {
            fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.ticker}&interval=5min&apikey=URO5UT82IEAW1NHV
            `)
                .then(res => res.json())
                .then(data => {
                    if (data.errors) {
                        alert("Invalid ticker symbol, Please enter a valid ticker symbol.")
                    }
                    else {
                        let lastRefreshed = data['Meta Data']['3. Last Refreshed']
                        let currentClosePrice = data['Time Series (5min)'][lastRefreshed]['4. close']
                        fetch(`${url}/v1/transactions`, {
                            method: 'POST',
                            body: JSON.stringify({
                                user_id: this.props.user.user_info.id,
                                ticker: this.state.ticker.toUpperCase(),
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
                                    this.updatePortfolioBalance()
                                    this.props.updatePortfolio()
                                    this.props.updateAccountBalance(data.qty, data.user_close)
                                }
                            })
                        this.setState({
                            ticker: '',
                            qty: 0
                        })
                    }
                })
        }
        else {
            alert("Please enter a valid whole number")
        }
    }

    render() {
        let portfolio = this.props.user.portfolio.map(p => <PortfolioCard p={p} key={p.ticker} updatePortfolio={this.props.updatePortfolio} />)
        return (
            <div>
                <h1>Portfolio (${this.props.userPortfolioBalance})</h1>
                {portfolio}
                <div className="login">
                    <p>Welcome {this.props.user.user_info.name}. Cash - ${this.props.userAccountBalance}</p>
                    <form onSubmit={this.handleSubmit}>
                        <label>Ticker Symbol: </label>
                        <input type="text" name="ticker" placeholder="ticker" value={this.state.ticker} onChange={this.handleChange} />
                        <label>Qty </label>
                        <input type="text" name="qty" placeholder="qty" value={this.state.qty} onChange={this.handleChange} />
                        <button>Buy</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Portfolio
