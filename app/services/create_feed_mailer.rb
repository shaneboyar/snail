class CreateFeedMailer
  def initialize(user)
    @user = user
    @lob = Lob::Client.new(api_key: Rails.application.secrets.lob_api_key)
    @filename = "#{Rails.root}/tmp/mail/#{@user.name.parameterize}.html"
  end

  def send
    create
    @lob.letters.create(
      description: "Demo Letter",
      to: {
        name: @user.name,
        address_line1: "185 Berry St",
        address_line2: "# 6100",
        address_city: "San Francisco",
        address_state: "CA",
        address_zip: "94107"
      },
      from: "adr_f05e22b1c577b098",
      file: File.open(@filename),
      color: false
    )
    File.delete(@filename) if File.exist?(@filename)
  end

  private

  def create
    view = ActionView::Base.new(ActionController::Base.view_paths, {
      user: @user,
      feed: @user.feed
    })

    content = view.render(file: "mailers/feed_mailer.html.erb")

    file = File.open(@filename, 'w+')
    file << content
    file.close
  end
end
