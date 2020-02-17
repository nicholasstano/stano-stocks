class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true
    validates :name, presence: true
    has_secure_password
    has_many :transactions
    has_many :portfolios

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
