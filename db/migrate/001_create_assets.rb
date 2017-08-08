class CreateAssets < ActiveRecord::Migration[5.1]
  def self.up
    create_table :assets do |t|
      t.string :caption, :title
    end
    
  end
  
  def self.down
    drop_table :assets
  end
end