class V1::UsersController < ApplicationController
    protect_from_forgery

    def index
        users = User.all 
        render json: users
    end

    def create
        user = User.new(email: params[:email], password: params[:password], name: params[:name], account_balance: 5000, portfolio_balance: 0)
        if user.save
            render json: {user: user.user_information, token: JWT.encode({userId: user.id}, 'secret')}
        else
          render json: {errors: user.errors.full_messages}
        end
    end

    def update
        user = User.find(params[:id])
        bal = 0
        user.portfolios.each do |p|
            bal = bal + p.total_price
        end
        user.update_attribute(:portfolio_balance, bal)
        render json: {user: user.user_information, token: JWT.encode({userId: user.id}, 'secret')}
    end
end
