class PrintAscii
  def initialize(image_name = "pickles.jpeg", width = 100)
    @image_name = image_name
    @width = width
    @gray_ramp = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1[][]?-_+~<>i!lI;:,\"^`'. "
    @ramp_length = @gray_ramp.length;
    @output = ""
    @max_width = 100;
    @max_height = 50;
  end

  def print
    # Open the resource
    image = Magick::Image.read("#{Rails.root}/app/assets/images/#{@image_name}").first
    image = image.quantize(number_colors=256, colorspace=Magick::GRAYColorspace) 
    width, height = clampDimensions(image.columns, image.rows)   
    image = image.resize_to_fit(width, height)
    image_height = image.rows
    image_width = image.columns
    puts "image.height: #{image_height}, width: #{image_width}"
    
    # Get the pixel array
    image.each_pixel do |pixel, col, row|
      average = (pixel.red/257 + pixel.green/257 + pixel.blue/257)/3
      char = get_character_for_grayscale(average)
      @output += char
        if (col == image_width - 1) and (col != 0)
            @output += "\n"
        end
    end
    @output
    create_file
  end

  private
  
  def get_character_for_grayscale(value)
    @gray_ramp[((@ramp_length - 1).ceil * value / 255)];
  end 

  def create_file
    file = File.open("#{Rails.root}/app/services/temp/mail.html", 'w+')
    file << "<html>
    <head>
    <meta charset='UTF-8'>
    <link href='https://fonts.googleapis.com/css?family=Crimson+Text:400,700' rel='stylesheet'>
    <title>Lob.com Sample Reminder Letter</title>
    <style>
      *, *:before, *:after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
      body {
        width: 8.5in;
        height: 11in;
        margin: 0;
        font-family: 'Crimson Text';
      }
      .page {
        page-break-after: always;
        position: relative;
        width: 8.5in;
        height: 11in;
      }
      .page-content {
        position: absolute;
        width: 8.125in;
        height: 10.625in;
        left: 0.1875in;
        top: 0.1875in;
        background-color: rgba(0,0,0,0);
      }
      .text {
        position: relative;
        left: 55px;
        top: 355px;
      }
    </style>
    </head>
    <body>
  <div class='page'>
    <div class='page-content'>
      <div class='text'>"
    file << "<pre style='font-size:6px;'>#{@output}</pre>"
    file << "</div></div></body></html>"
    file.close
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