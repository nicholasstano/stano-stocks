class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :ticker
      t.integer :qty
      t.integer :user_id

      t.timestamps
    end
  end
end
