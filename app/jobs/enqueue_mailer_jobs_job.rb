class EnqueueMailerJobsJob < ApplicationJob
  queue_as :default

  def perform
    # Do something later
    User.all.each do |user|
      next if user.feed.count == 0
      CreateAndMailFeedsJob.perform_later(user)
    end
  end
end
