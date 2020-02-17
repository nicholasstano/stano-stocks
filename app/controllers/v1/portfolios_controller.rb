class V1::PortfoliosController < ApplicationController
    protect_from_forgery

    def index
        portfolios = Portfolio.all
        render json: portfolios
    end
end
