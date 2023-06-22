import os
from PIL import Image

# Defining the mapping dictionaries
material_mapping = {
    'syntex': 'syntex',
    'nappa-leather': 'nappa',
    'leather': 'leather'
}

color_mapping = {
    'black': 'black',
    'sage-green': 'gray',
    'gray-and-navy': 'gray-and-navy',
    'grey': 'gray'
}

def get_new_name(old_name):
    parts = old_name.split("_")
    color = ''
    material = ''

    # Identify material type
    for key in material_mapping:
        if key in old_name:
            material = material_mapping[key]
            break
    else:
        material = 'leather'

    # Identify color
    for key in color_mapping:
        if key in old_name:
            color = color_mapping[key]
            break
    else:
        color = parts[1]

    # Construct new name
    new_name = f"{color}--{material}--seat-trim.png"

    return new_name

def convert_to_png(old_path, new_path):
    img = Image.open(old_path)
    img.save(new_path)

def rename_and_convert(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            old_path = os.path.join(directory, filename)
            new_name = get_new_name(filename)
            new_path = os.path.join(directory, new_name)
            
            # Convert to png if jpg
            if filename.endswith(".jpg"):
                convert_to_png(old_path, new_path)
                os.remove(old_path)  # Delete the original .jpg file
            else:
                os.rename(old_path, new_path)

# Call the function with the directory containing the images
rename_and_convert(".")
