from PIL import Image
from io import BytesIO
from pathlib import Path
from globals import api
from funcs.setStatus import set_initial_status, set_mid_status, set_end_status


# Directory for these images
FLIPPED_SAVE_DIR = Path("./images/flippedImages")

# Function to flip the image while also keeping track of the task progress
def flip(task_id, file_content: bytes, schema):
    flipDirection = schema.flipDirection

     # function to set the initial status
    save_path, new_filename, og_filename = set_initial_status("Flip", task_id, FLIPPED_SAVE_DIR)

    # Flip the image based on the direction
    image = Image.open(BytesIO(file_content))
    if flipDirection == "horizontal":
        flipped_image = image.transpose(Image.FLIP_LEFT_RIGHT)
    elif flipDirection == "vertical":
        flipped_image = image.transpose(Image.FLIP_TOP_BOTTOM)
    else:
        raise ValueError("Invalid flip direction")

    set_mid_status(task_id)
    
    # Ensure the directory exists
    FLIPPED_SAVE_DIR.mkdir(parents=True, exist_ok=True)

    # Save the flipped image to the directory
    with save_path.open("wb") as buffer:
        flipped_image.save(buffer, format=image.format)

    set_end_status(task_id)

    return {
        "msg": f"{og_filename} successfully flipped.",
        "file_url": f"/{api}/flippedImages/{new_filename}"
    }
