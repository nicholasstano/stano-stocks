class V1::UsersController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        users = User.all 
        render json: users
    end

    def create
        user = User.new(email: params[:email], password: params[:password], name: params[:name], account_balance: 5000)
        if user.save
            render json: {user: user, token: JWT.encode({userId: user.id}, 'secret')}
        else
          render json: {errors: user.errors.full_messages}
        end
    end
end
