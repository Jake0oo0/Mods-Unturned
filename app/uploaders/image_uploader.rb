# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base
  storage :file

  def store_dir
    "#{Rails.root}/public/uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg png)
  end
end
