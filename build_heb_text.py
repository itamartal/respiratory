#!/usr/bin/python3

from PIL import Image, ImageDraw, ImageFont
import os

BACKGROUND_COLOR = (0, 0, 0, 0)
TEXT_COLOR = (0, 0, 0, 255)

INPUT_FILE = "hebrew_labels.txt"
OUTPUT_DIR = "images/generated"
FONT_PATH = "fonts/DejaVuSans.ttf"
LINE_MAX_LENGTH = 4
FONT_SIZE = 22
W_PADDING = 10
H_PADDING = 3

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load a font (adjust the path if needed)
font = ImageFont.truetype(FONT_PATH, FONT_SIZE)  # Change size as needed

def split_into_lines(text, max_words=LINE_MAX_LENGTH):
    words = text.split()
    lines = [" ".join(words[i:i + max_words]) for i in range(0, len(words), max_words)]
    return lines

# Read the input file and generate images
with open(INPUT_FILE, "r", encoding="utf-8") as file:
    for i, line in enumerate(file):
        line = line.strip()
        if not line:
            continue  # Skip empty lines
        
        split_line = split_into_lines(line)

        # Estimate image size based on text length
        img_width = int(max(font.getlength(t) for t in split_line)) + (W_PADDING * 2)
        img_height = (len(split_line) * FONT_SIZE) + (H_PADDING * 2)
        
        # Create a transparent image
        image = Image.new("RGBA", (img_width, img_height), BACKGROUND_COLOR)
        draw = ImageDraw.Draw(image)

        text_x, text_y = W_PADDING, H_PADDING  # Padding

        for t in split_line:
            expected_text_w = font.getlength(t)

            #import pdb; pdb.set_trace()
            rtl_padding = (img_width - font.getlength(t) - W_PADDING * 2) if expected_text_w < img_width - (W_PADDING * 2) else 0

            # Draw text
            draw.text((text_x + rtl_padding, text_y),
                      t, font=font, fill=TEXT_COLOR)  # White text
            text_y += FONT_SIZE
            
        # Save the image
        image_path = os.path.join(OUTPUT_DIR, f"label_{i+1}.png")
        image.save(image_path, "PNG")

        print(f"Saved: {image_path}")

print("✅ Image generation complete!")
