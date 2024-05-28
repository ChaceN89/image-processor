from PIL import Image
from io import BytesIO
from pathlib import Path
from globals import api
from PIL import Image, ImageEnhance
from funcs.setStatus import set_initial_status, set_mid_status, set_end_status


# the directory for these images
ENHANCE_SAVE_DIR = Path("./images/enhancedImages")

# fucntion to resize the image while also keeping track of the task progress
def enhance(task_id, file_content: bytes, schema):
    enhanceFactor = schema.enhanceFactor

     # function to set the initial status
    save_path, new_filename, og_filename = set_initial_status("Enhance", task_id, ENHANCE_SAVE_DIR)

    # Enhance the photo using enhanceFactor
    image = Image.open(BytesIO(file_content))
    enhancer = ImageEnhance.Brightness(image)  # Example for brightness, can be changed as needed
    enhanced_image = enhancer.enhance(enhanceFactor)

    set_mid_status(task_id)

    # Ensure the directory exists
    ENHANCE_SAVE_DIR.mkdir(parents=True, exist_ok=True)
    
    # Save image
    with open(save_path, "wb") as buffer:
        enhanced_image.save(buffer, format=image.format)

    set_end_status(task_id)

    return {
        "msg": f"{og_filename} successfully enhanced.",
        "file_url": f"/{api}/enhancedImages/{new_filename}"
    }