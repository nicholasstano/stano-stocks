class AuthController < ApplicationController
    skip_before_action :verify_authenticity_token

    def login
      user = User.find_by(email: params[:email])
      if (user && user.authenticate(params[:password]))
        render json: user
      else
        render json: {errors: "invalid email and password combination"}
      end
    end
end  