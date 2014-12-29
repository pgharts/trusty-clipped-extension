require 'trusty-clipped-extension'
require 'acts_as_list'
require 'uuidtools'
require 'trusty_cms_clipped_extension/cloud'
require 'paperclip'
require 'will_paginate/array'
module Clipped
  class Engine < Rails::Engine
    paths["app/helpers"] = []

    initializer "trusty_cms.assets.precompile" do |app|
      app.config.assets.precompile += %w(admin/assets.css assets_admin.js)
    end

  end
end
