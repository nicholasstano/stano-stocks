class AddPortfolioBalanceToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :portfolio_balance, :decimal
  end
end
