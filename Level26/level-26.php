<?php
class Level26Solver {

    // Needed attributes
    public $image;
    public $offsetArray = [];
    public $password;

    function __construct($imagePath)
    {
        $this->image = imagecreatefrompng($imagePath);
        $this->processImage();
        $this->generatePassword();
    }

    // Reads over pixels in image
    function processImage()
    {
        $width  = imagesx($this->image);
        $length = imagesy($this->image);

        for ($y = 0; $y < $length; $y++)
        {
            for ($x = 0; $x < $width; $x++)
            {
                // Color will be an int value
                $color = imagecolorat($this->image, $x, $y);
                // If it isn't 0 (white), push it to array of offsets
                if ($color != 0)
                {
                    array_push($this->offsetArray, $x);
                }
            }
        }
    }

    // Assembles password
    function generatePassword()
    {
        foreach($this->offsetArray as $offset)
        {
            // Add 65 to each offset to get char, (Uppercase letters)
            $this->password .= chr($offset + 65);
        }
    }

}
// Create new solver object with path to image as an argument
$solver = new Level26Solver('offset_image.png');
echo $solver->password . "\n";
?>
