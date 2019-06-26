require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(name: "Example User", email: "user@example.com",
                     password: "foobar", password_confirmation: "foobar")
  end

  test "associated posts should be destroyed" do
    @user.save
    @user.posts.create!(content: "Lorem ipsum")
    assert_difference 'Post.count', -1 do
      @user.destroy
    end
  end

  test "should follow and unfollow a user" do
    one = users(:one)
    two  = users(:two)
    assert_not one.following?(two)
    one.follow(two)
    assert one.following?(two)
    assert two.followers.include?(one)
    one.unfollow(two)
    assert_not one.following?(two)
  end
end
