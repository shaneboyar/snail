class PrintAscii
  def initialize(image_name, width = 100)
    return unless File.exist?("#{Rails.root}/app/assets/images/#{@image_name}")
    @image_name = image_name
    @width = width
    @gray_ramp = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1[][]?-_+~<>i!lI;:,\"^`'  "
    @ramp_length = @gray_ramp.length;
    @output = ""
    @max_width = 100;
    @max_height = 50;
  end

  def create_html
    output_ascii
    return "<div class='ad'><div>This letter has been brought to you by the fine folks at:</div><pre style='font-size:6px;'>#{@output}</pre></div>".html_safe
  end

  private
  
  def get_character_for_grayscale(value)
    @gray_ramp[((@ramp_length - 1).ceil * value / 255)];
  end 

  def output_ascii
    # Open the resource
    image = Magick::Image.read("#{Rails.root}/app/assets/images/#{@image_name}").first
    image = image.quantize(number_colors=256, colorspace=Magick::GRAYColorspace) 
    width, height = clampDimensions(image.columns, image.rows)   
    image = image.resize_to_fit(width, height)
    image_height = image.rows
    image_width = image.columns    
    # Get the pixel array
    image.each_pixel do |pixel, col, row|
      average = (pixel.red/257 + pixel.green/257 + pixel.blue/257)/3
      char = get_character_for_grayscale(average)
      @output += char
        if (col == image_width - 1) and (col != 0)
            @output += "\n"
        end
    end
  end

  def clampDimensions(width, height)
    if (height > @max_height)
        reduced_width = (width * @max_height / height).floor;
        return [reduced_width, @max_height];
    end

    if (width > @max_width)
        reduced_width = (height * @max_width / width).floor;
        return [@max_width, reduced_width];
    end

    [width, height];
  end

end