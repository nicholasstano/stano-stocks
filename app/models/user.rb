class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true
    validates :name, presence: true
    has_secure_password
    has_many :transactions
    has_many :portfolios

    # def portfolio 
    #     if self.transactions.length > 0       
    #         user_tickers = self.transactions.map{|t| t.ticker}.uniq
    #         portfolio_array = []
    #         user_tickers.each do |ticker|
    #             ticker_obj = {}
    #             transaction = self.transactions.select{|t| t.ticker == ticker}.find{|t| t.current_close}
    #             qtys = self.transactions.select{|t| t.ticker == ticker}.map{|t| t.qty}
    #             total_qty = qtys.reduce(0) {|s, n| s + n}
    #             ticker_obj['ticker'] = ticker
    #             ticker_obj['qty'] = total_qty
    #             ticker_obj['current_close'] = transaction.current_close
    #             ticker_obj['total_price'] = total_qty * transaction.current_close
    #             portfolio_array << ticker_obj
    #         end
    #         portfolio_array
    #     else 
    #     []
    #     end
    # end

    def user_information

        {
            user_info: {
                id: self.id,
                email: self.email,
                name: self.name,
                account_balance: self.account_balance,
                password_digest: self.password_digest
            },
            transactions: self.transactions,
            portfolio: self.portfolios
        }
    end
end
