class RelationshipsController < ApplicationController
  before_action :authorize_request

  def index
    render json: {follows: @current_user.following.select([:id])}, status: :ok
  end

  def create
    begin 
      @follow = User.find(relationship_params["id"])
      @current_user.follow(@follow)
      render json: {message: "OK"}, status: :ok
    rescue StandardError => e
      render json: {error: e}
    end
  end

  private

    def relationship_params
      params.require(:relationship).permit(:id)
    end
end
