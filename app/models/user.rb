class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true
    validates :name, presence: true
    has_secure_password
    has_many :transactions

    def user_information
        {
            user_info: {
                id: self.id,
                email: self.email,
                name: self.name,
                account_balance: self.account_balance,
                password_digest: self.password_digest
            },
            transactions: self.transactions
        }
    end

    # def portfolio
    #     char_map = {}
    #     self.transactions.each do |
    # end
end
