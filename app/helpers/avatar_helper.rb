module AvatarHelper
  require 'cgi'
  def avatar(user, options = {})
    image = gravatar_url user.email, options
    image_tag image, :alt => t('users.avatar'), class: 'avatar' if image.present?
  end

  def gravatar_url(email, options = {})
    require 'digest/md5' unless defined?(Digest::MD5)
    md5 = Digest::MD5.hexdigest(email.to_s.strip.downcase)
    options[:s] = options.delete(:size) || 60
    options[:d] = options.delete(:default)
    options.delete(:d) unless options[:d]
    default = CGI.escape(image_full_url('zombie.png'))
    "#{request.ssl? ? 'https://secure' : 'http://www'}.gravatar.com/avatar/#{md5}?#{options.to_param}&d=#{default}"
  end
end