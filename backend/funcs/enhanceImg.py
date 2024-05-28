from taskManager import tasks_status
from PIL import Image
from io import BytesIO
import time
from pathlib import Path
from globals import api
from PIL import Image, ImageEnhance

# the directory for these images
SAVE_DIR = Path("./images/enhancedImages")

# fucntion to resize the image while also keeping track of the task progress
def enhance(task_id, file_content: bytes, schema):
    enhanceFactor = schema.enhanceFactor

    # get the original name
    og_filename = tasks_status[task_id]["original_filename"] 
    
    # Define the new filename with task_id
    new_filename = f"{task_id}_{og_filename}"
    save_path = SAVE_DIR / new_filename

    # Update task status to "In Progress"
    tasks_status[task_id]["status"] = "In Progress"
    tasks_status[task_id]["filename"] = new_filename
    tasks_status[task_id]["task_name"] = "Enhance"
    tasks_status[task_id]["progress"] = 0

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 25

    # Enhance the photo using enhanceFactor
    image = Image.open(BytesIO(file_content))
    enhancer = ImageEnhance.Brightness(image)  # Example for brightness, can be changed as needed
    enhanced_image = enhancer.enhance(enhanceFactor)

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 50
    
    # Save image
    with open(save_path, "wb") as buffer:
        enhanced_image.save(buffer, format=image.format)

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 75
    time.sleep(1)  # Simulate work being done

    # Update task status to completed
    tasks_status[task_id]["status"] = "Completed"
    tasks_status[task_id]["progress"] = 100

    return {
        "msg": f"{og_filename} successfully enhanced.",
        "file_url": f"/{api}/enhancedImages/{new_filename}"
    }