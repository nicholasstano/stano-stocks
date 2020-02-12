Rails.application.routes.draw do
  #path for users
  namespace :v1, defaults: {format: 'json'} do 
    get 'users', to: 'users#index'
  end
  
  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  root to: 'static#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
