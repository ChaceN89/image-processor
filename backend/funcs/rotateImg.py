from PIL import Image
from io import BytesIO
from pathlib import Path
from globals import api
from funcs.setStatus import set_initial_status, set_mid_status, set_end_status


# Directory for these images
ROTATED_SAVE_DIR = Path("./images/rotatedImages")

# Function to rotate the image while also keeping track of the task progress
def rotate(task_id, file_content: bytes, schema):
    rotateDegrees = schema.rotateDegrees

    # function to set the initial status
    save_path, new_filename, og_filename = set_initial_status("Rotate", task_id, ROTATED_SAVE_DIR)

    # Rotate the photo using rotateDegrees
    image = Image.open(BytesIO(file_content))
    rotated_image = image.rotate(rotateDegrees, expand=True)

    set_mid_status(task_id)
    
    # Ensure the directory exists
    ROTATED_SAVE_DIR.mkdir(parents=True, exist_ok=True)

    # Save the rotated image to the directory
    with save_path.open("wb") as buffer:
        rotated_image.save(buffer, format=image.format)

    set_end_status(task_id)

    return {
        "msg": f"{og_filename} successfully rotated.",
        "file_url": f"{api}/rotatedImages/{new_filename}"
    }
