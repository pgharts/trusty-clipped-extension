class CreateUserObserver < ActiveRecord::Migration
  def self.up
    add_column :assets, :created_by, :integer
    add_column :assets, :updated_by, :integer
  end
  
  def self.down
    remove_column :assets, :created_by
    remove_column :assets, :updated_by
  end
end