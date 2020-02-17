import React, { Component } from 'react'
import { url } from './config'

export class PortfolioCard extends Component {
    //Use state to change the color of the stock depending on how it is doing when the user is viewing the portfolio page.
    state = {
        color: "gray"
    }

    componentDidMount() {
        //when this page loads two fetches are made to the ALPHA VANTAGE API of a possible five per minute. However if there are three stocks then six fetches are made. Therefore the free API key allows minimal commands unfortunately. 
        this.compareOpenAndClose();
        this.compareCloseAndCurrentClose();
        //Have both of the functions rerun every five minutes since the TIME_SERIES_INTRADAY updates every 5 minutes. 
        setInterval(this.compareOpenAndClose, 5 * 60000);
        setInterval(this.compareCloseAndCurrentClose, 5 * 60000);
    }
    //Function to compare the days open price with the current price of the stock. 
    compareOpenAndClose = () => {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.p.ticker}&interval=5min&apikey=URO5UT82IEAW1NHV`)
            //I used this URL to do a lot of testing because it was free. The above URL only allowed me to make 5 API requests per minute. 
            // fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo`)
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
    //Function to update the users close price of the stocks they have bought.
    compareCloseAndCurrentClose = () => {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.p.ticker}&interval=5min&apikey=URO5UT82IEAW1NHV`)
            //I used this URL to do a lot of testing because it was free. The above URL only allowed me to make 5 API requests per minute. 
            // fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo`)
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
        //Display the different Symbols that a user has bought stocks in, their quantities, and total price.
        return (
            <div className="portfolioIndStock" style={divStyle}>
                <p>{this.props.p.ticker} - {this.props.p.qty} Shares</p>
                <p>{this.props.p.total_price}</p>
            </div>
        )
    }
}

export default PortfolioCard