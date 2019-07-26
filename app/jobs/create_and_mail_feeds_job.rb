class CreateAndMailFeedsJob < ApplicationJob
  queue_as :default

  def perform(user)
    # Do something later
    mailer = CreateFeedMailer.new(user)
    mailer.send
  end
end
