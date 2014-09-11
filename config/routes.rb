TrustyCms::Application.routes.draw do
  namespace :admin do
    resources :assets do
      get :remove, on: :member
      get :refresh, on: :collection
      post :regenerate, on: :collection
      put :refresh, on: :member
    end
    resources :page_attachments, :only => [:new] do
      get :remove, on: :member
    end
    resources :pages do
      get :remove, on: :member
      resources :page_attachments
    end
  end
end
