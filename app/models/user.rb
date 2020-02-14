class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true
    validates :name, presence: true
    has_secure_password
    has_many :transactions
end
