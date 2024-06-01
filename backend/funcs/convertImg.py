from PIL import Image
from io import BytesIO
from pathlib import Path
from globals import api
from funcs.setStatus import set_initial_status, set_mid_status, set_end_status


# Directory for these images
CONVERTED_SAVE_DIR = Path("./images/convertedImages")

# Function to convert the image format while also keeping track of the task progress
def convert(task_id, file_content: bytes, schema):
    convertTo = schema.convertTo

    # function to set the initial status
    save_path, new_filename, og_filename = set_initial_status("Convert", task_id, CONVERTED_SAVE_DIR)

    # Convert the image to the new format
    image = Image.open(BytesIO(file_content))

    set_mid_status(task_id)
    
    # Ensure the directory exists
    CONVERTED_SAVE_DIR.mkdir(parents=True, exist_ok=True)

    # Save the converted image to the directory
    with save_path.open("wb") as buffer:
        image.save(buffer, format=convertTo.upper())

    set_end_status(task_id)

    return {
        "msg": f"{og_filename} successfully converted to {convertTo}.",
        "file_url": f"{api}/convertedImages/{new_filename}"
    }
