TrustyCms::Application.routes.draw
  namespace :admin do
    get :remove, on: :member
    resources :assets do
      get :refresh, on: :collection
      post :regenerate, on: :collection
      put :refresh, on: :member
    end
    resources :page_attachments, :only => [:new]
    resources :pages do
      resources :page_attachments
    end
end

