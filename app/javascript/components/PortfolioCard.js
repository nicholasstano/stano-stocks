import React, { Component } from 'react'
import { url } from './config'

export class PortfolioCard extends Component {

    state = {
        color: "gray"
    }

    componentDidMount() {
        this.compareOpenAndClose();
        this.compareCloseAndCurrentClose();
        //compare the open and close price every 5 minutes.
        setInterval(this.compareOpenAndClose, 5 * 60000);
        setInterval(this.compareCloseAndCurrentClose, 5 * 60000);
    }

    compareOpenAndClose = () => {
        // fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.p.ticker}&interval=5min&apikey=URO5UT82IEAW1NHV`)
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo`)
            .then(res => res.json())
            .then(data => {
                let lastRefreshed = data['Meta Data']['3. Last Refreshed']
                let currentClosePrice = data['Time Series (5min)'][lastRefreshed]['4. close']
                let currentOpenPrice = data['Time Series (5min)'][lastRefreshed]['1. open']
                if (currentClosePrice > currentOpenPrice) {
                    this.setState({ color: "green" })
                }
                else if (currentClosePrice < currentOpenPrice) {
                    this.setState({ color: "red" })
                }
                else {
                    this.setState({ color: "gray" })
                }
            })
    }

    compareCloseAndCurrentClose = () => {
        // fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.p.ticker}&interval=5min&apikey=URO5UT82IEAW1NHV`)
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo`)
            .then(res => res.json())
            .then(data => {
                let lastRefreshed = data['Meta Data']['3. Last Refreshed']
                let currentClosePrice = data['Time Series (5min)'][lastRefreshed]['4. close']

                fetch(`${url}/v1/portfolios/${this.props.p.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        current_close: currentClosePrice,
                    }),
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        this.props.updatePortfolio()
                    })
            })
    }

    render() {
        const divStyle = {
            color: this.state.color,
        };
        return (
            <div className="portfolioIndStock" style={divStyle}>
                <p>{this.props.p.ticker} - {this.props.p.qty} Shares</p>
                <p>{this.props.p.total_price}</p>
            </div>
        )
    }
}

export default PortfolioCard