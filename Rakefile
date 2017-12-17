require 'bundler'
Bundler.setup

require 'i18n'
require "i18n/backend/fallbacks"
I18n::Backend::Simple.send(:include, I18n::Backend::Fallbacks)

namespace :docker do
  desc "build docker images"
  task :build do
    puts "Building bitcoincash docker image"
    puts `docker build -t bitcoincash .`
  end
end

namespace :translations do
  desc "build translated html files"
  task :build do
    puts "Building bitcoincash translated html files"
  end
  desc "check translation files"
  task :check do
    puts "Checking bitcoincash translation files"
  end
end

task :default => 'docker:build'
