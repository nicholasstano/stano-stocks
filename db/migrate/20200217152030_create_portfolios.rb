class CreatePortfolios < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolios do |t|
      t.string :ticker
      t.integer :qty
      t.decimal :current_close
      t.decimal :total_price
      t.integer :user_id

      t.timestamps
    end
  end
end
