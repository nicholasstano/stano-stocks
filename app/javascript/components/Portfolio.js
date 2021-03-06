import React, { Component } from 'react'
import { url } from './config'
import PortfolioCard from './PortfolioCard'

export class Portfolio extends Component {

    state = { ticker: "", qty: "" }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    componentDidMount() {
        this.updatePortfolioBalance()
        //update portfolio balance every five minutes to sync up with API calls on the Portfolio Cards.
        setInterval(this.updatePortfolioBalance, 5 * 60000);
    }
    //Function to update user on the backend 
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
    //Handle Submit when user Buys a Stock.
    handleSubmit = e => {
        e.preventDefault()
        if (Number.isInteger(parseFloat(this.state.qty)) && parseInt(this.state.qty) > 0) {
            fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.ticker}&interval=5min&apikey=URO5UT82IEAW1NHV
            `)
                .then(res => res.json())
                .then(data => {
                    if (data.errors) {
                        //if there is no ticker symbol for what the user typed in an error will alert the user.
                        alert("Invalid ticker symbol, Please enter a valid ticker symbol.")
                    }
                    else {
                        //Grab the lastRefreshed time to get the current close price at that time the user submits. 
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
                                    //update transaction page
                                    this.props.user.transactions.push(data)
                                    //call back functions to change account balance and portfolio balance.
                                    this.updatePortfolioBalance()
                                    this.props.updatePortfolio()
                                    this.props.updateAccountBalance(data.qty, data.user_close)
                                }
                            })
                        this.setState({
                            ticker: '',
                            qty: ""
                        })
                    }
                })
        }
        else {
            //if user enters and incorrect quantity.
            alert("Please enter a valid whole number")
        }
    }

    render() {
        let portfolio = this.props.user.portfolio.map(p => <PortfolioCard p={p} key={p.ticker} updatePortfolio={this.props.updatePortfolio} />)
        return (
            <div className="portfolioAndBuyer">
                <div className="portfolio">
                    <h1>Portfolio (${this.props.userPortfolioBalance})</h1>
                    {portfolio}
                </div>
                <div className="buyStockForm">
                    <p>Cash - ${this.props.userAccountBalance}</p>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="form-control" name="ticker" placeholder="ticker" value={this.state.ticker} onChange={this.handleChange} />
                        <input type="text" className="form-control" name="qty" placeholder="qty" value={this.state.qty} onChange={this.handleChange} />
                        <button className="btn btn-info">Buy</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Portfolio
