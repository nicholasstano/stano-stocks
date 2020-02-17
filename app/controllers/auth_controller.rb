class AuthController < ApplicationController
    protect_from_forgery
    #user login function, authenticates and uses a token to hide their personal information from the browser. 
    def login
      user = User.find_by(email: params[:email])
      if (user && user.authenticate(params[:password]))
        render json: {user: user.user_information, token: JWT.encode({userId: user.id}, 'secret')}
      else
        render json: {errors: "Invalid email/password combination. Please try again or register if you do not already have an account."}
      end
    end
    #auto login function if the user has not logged out they will stay logged in.
    def autologin
        token = request.headers['Authorization']
        user_id = JWT.decode(token, 'secret')[0]["userId"]
        user = User.find(user_id)
        render json: user.user_information
    end
end  