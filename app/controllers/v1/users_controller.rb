class V1::UsersController < ApplicationController
    def index
        users = User.all 
        render json: users
    end

    def create
        user = User.new(user_params)
        if user.save
            user.account_balance = 5000.00
          render json: user
        else
          render json: {errors: user.errors.full_messages}
        end
    end

    private 

    def user_params 
        params.require(:user).permit(:id, :email, :password, :name, :account_balance)
    end

end
