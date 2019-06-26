class PostsController < ApplicationController
  before_action :authorize_request

  def create
    @post = @current_user.posts.build(post_params)
    if @post.save
      render json: {message: "OK"}, status: :ok
    else
      render json: {error: @post.error.full_messages}
    end
  end


  private

    def post_params
      params.require(:post).permit(:content)
    end

end
