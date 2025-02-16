#!/usr/bin/python3

from PIL import Image, ImageDraw, ImageFont
import os

# Ensure output directory exists
output_dir = "images/generated"
os.makedirs(output_dir, exist_ok=True)

# Load a font (adjust the path if needed)
try:
    font = ImageFont.truetype("fonts/NotoSansHebrew-Regular.ttf", 22)  # Change size as needed
except IOError as exc:
    font = ImageFont.load_default()
    print("loaded default font:", exc)

# Read the input file and generate images
input_file = "hebrew_labels.txt"

with open(input_file, "r", encoding="utf-8") as file:
    for i, line in enumerate(file):
        line = line.strip()
        if not line:
            continue  # Skip empty lines
        
        # Estimate image size based on text length
        img_width = int(font.getlength(line) + 20)
        img_height = 20
        
        # Create a transparent image
        image = Image.new("RGBA", (img_width, img_height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(image)
        
        # Draw text
        text_x, text_y = 10, 10  # Padding
        draw.text((text_x, text_y), line, font=font, fill=(0, 0, 0, 255))  # Black text
        
        # Save the image
        image_path = os.path.join(output_dir, f"{i+1}.png")
        image.save(image_path, "PNG")

        print(f"Saved: {image_path}:", repr(line))

print("✅ Image generation complete!")
