Rails.application.routes.draw do
  #path for users
  post '/login', to: 'auth#login'
  get '/autologin', to: 'auth#autologin'
  
  namespace :v1, defaults: {format: 'json'} do 
    post '/signup', to: 'users#create'
    resources :users
  end
  
  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  root to: 'static#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
