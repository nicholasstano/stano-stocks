class V1::PortfoliosController < ApplicationController
    protect_from_forgery

    def index
        portfolios = Portfolio.all
        render json: portfolios
    end


    def update
        portfolio = Portfolio.find(params[:id])
        updated_price = params[:current_close].to_d * portfolio.qty
        portfolio.update_attributes(current_close: params[:current_close].to_d, total_price: updated_price)
        render json: portfolio
    end
end
