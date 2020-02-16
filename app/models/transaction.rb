class Transaction < ApplicationRecord
    belongs_to :user
    validates :qty, numericality: { only_integer: true }
end
