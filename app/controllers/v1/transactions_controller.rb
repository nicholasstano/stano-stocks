class V1::TransactionsController < ApplicationController
    protect_from_forgery

    def index
        transactions = Transaction.all
        render json: transactions
    end

    def create 
        transaction = Transaction.new(user_id: params[:user_id], ticker: params[:ticker], qty: params[:qty], user_close: params[:user_close], current_close: params[:current_close])
        user = User.find(transaction[:user_id])
        user_account_balance = user.account_balance 
        total_stock_price = transaction.user_close * transaction.qty
        balance_minus_stock_price = user_account_balance - total_stock_price
        if balance_minus_stock_price >= 0
            user.update_attribute(:account_balance, balance_minus_stock_price)
            user.save
            transaction.save
            render json: transaction
        elsif balance_minus_stock_price < 0
            render json: {errors: "You do not have the appropriate balance to purchase stocks. Please add more money to your account."}
        elsif transaction.qty.is_a?(Integer)
            render json: {errors: "Enter a valid whole number"}
        end
    end 
end
