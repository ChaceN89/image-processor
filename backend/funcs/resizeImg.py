from PIL import Image
from io import BytesIO
from pathlib import Path
from globals import api
from funcs.setStatus import set_initial_status, set_mid_status, set_end_status

# the directory for these images
SAVE_DIR = Path("./images/resizedImages")

# fucntion to resize the image while also keeping track of the task progress
def resize(task_id, file_content: bytes, schema):
    resizeWidth = schema.resizeWidth
    resizeHeight = schema.resizeHeight
    
    # function to set the initial status
    save_path, new_filename, og_filename = set_initial_status("Resize", task_id, SAVE_DIR)

    # Resize the photo related to the width and height
    image = Image.open(BytesIO(file_content))
    resized_image = image.resize((resizeWidth, resizeHeight), Image.LANCZOS)

    set_mid_status(task_id)

    # Ensure the directory exists
    SAVE_DIR.mkdir(parents=True, exist_ok=True)

    # Save the resized image to the directory - the diretory should exist  - but if error happen you can make sure it exists here
    with open(save_path, "wb") as buffer:
        resized_image.save(buffer, format=image.format)

    set_end_status(task_id)

    return {
        "msg": f"{og_filename} successfully resized.",
        "file_url": f"/{api}/resizedImages/{new_filename}"
    }