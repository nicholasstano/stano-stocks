class AuthController < ApplicationController
    skip_before_action :verify_authenticity_token

    def login
      user = User.find_by(email: params[:email])
      if (user && user.authenticate(params[:password]))
        render json: {user: user, token: JWT.encode({userId: user.id}, 'secret')}
      else
        render json: {errors: "Invalid email/password combination. Please try again or register if you do not already have an account."}
      end
    end

    def autologin
        token = request.headers['Authorization']
        user_id = JWT.decode(token, 'secret')[0]["userId"]
        user = User.find(user_id)
        render json: user
    end
end  