class V1::TransactionsController < ApplicationController
    protect_from_forgery

    def index
        transactions = Transaction.all
        render json: transactions
    end
    #When a user buys a new stock this is the post request. 
    def create 
        transaction = Transaction.new(user_id: params[:user_id], ticker: params[:ticker], qty: params[:qty], user_close: params[:user_close], current_close: params[:current_close])
        user = User.find(transaction[:user_id])
        user_account_balance = user.account_balance 
        total_stock_price = transaction.user_close * transaction.qty
        balance_minus_stock_price = user_account_balance - total_stock_price
        #checks to see if the user has sufficient funds to buy the number of stocks at the current price. Creates a Transaction that will be viewable on the users Transactions tab.
        if balance_minus_stock_price >= 0
            user.update_attribute(:account_balance, balance_minus_stock_price)
            user.save
            transaction.save
            #if this is a stock in the users portfolio already find it.
            portfolio = Portfolio.where(ticker: transaction.ticker, user_id: params[:user_id])
            if portfolio.length > 0
                current_qty = transaction.qty
                new_qty = portfolio[0].qty + current_qty
                transaction_close = transaction.user_close 
                new_price = new_qty * transaction_close
                portfolio[0].update_attributes(qty: new_qty, current_close: transaction_close, total_price: new_price)
            #otherwise create a new portfolio for the stock which will be displayed on the Portfolio page.
            else
                new_price = transaction.qty * transaction.user_close
                Portfolio.create(user_id: params[:user_id], ticker: params[:ticker], qty: params[:qty], current_close: params[:current_close], total_price: new_price)
            end
            render json: transaction
        elsif balance_minus_stock_price < 0
            render json: {errors: "You do not have the appropriate balance to purchase stocks. Please add more money to your account."}
        end
    end 
end
