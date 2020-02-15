class AddCloseToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :user_close, :decimal
    add_column :transactions, :current_close, :decimal
  end
end
