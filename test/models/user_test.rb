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

  test "feed should have the right posts" do
    one = users(:one)
    two  = users(:two)
    three    = users(:three)
    # Posts from followed user
    three.posts.each do |post_following|
      assert one.feed.include?(post_following)
    end
    # Posts from self
    one.posts.each do |post_self|
      assert one.feed.include?(post_self)
    end
    # Posts from unfollowed user
    two.posts.each do |post_unfollowed|
      assert_not one.feed.include?(post_unfollowed)
    end
  end
end
