import React, { Component } from 'react'

export class Portfolio extends Component {

    handleSubmit = e => {
        e.preventDefault()
        fetch(`${url}/v1/transactions`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {

            })


        this.setState({
            email: '',
            password: ''
        })
    }

    render() {
        return (
            <div>
                <h1>Portfolio</h1>
                <p>Welcome {this.props.user.name}. Your current balance is {this.props.user.account_balance}</p>
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
