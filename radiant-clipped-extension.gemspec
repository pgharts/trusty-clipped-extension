# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "radiant-clipped-extension"

Gem::Specification.new do |s|
  s.name        = "radiant-clipped-extension"
  s.version     = TrustyCmsClippedExtension::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = TrustyCmsClippedExtension::AUTHORS
  s.email       = TrustyCmsClippedExtension::EMAIL
  s.homepage    = TrustyCmsClippedExtension::URL
  s.summary     = TrustyCmsClippedExtension::SUMMARY
  s.description = TrustyCmsClippedExtension::DESCRIPTION

  s.add_dependency "acts_as_list", "0.1.4"
  s.add_dependency "paperclip",    "~> 2.7.0"
  s.add_dependency "uuidtools",    "~> 2.1.2"
  s.add_dependency "cocaine",      "~> 0.3.2"

  ignores = if File.exist?('.gitignore')
    File.read('.gitignore').split("\n").inject([]) {|a,p| a + Dir[p] }
  else
    []
  end
  s.files         = Dir['**/*'] - ignores
  s.test_files    = Dir['test/**/*','spec/**/*','features/**/*'] - ignores
  # s.executables   = Dir['bin/*'] - ignores
  s.require_paths = ["lib"]
end
