from taskManager import tasks_status
from PIL import Image
from io import BytesIO
import time
from pathlib import Path
from globals import api

# Directory for these images
ROTATED_SAVE_DIR = Path("./images/rotatedImages")

# Function to rotate the image while also keeping track of the task progress
def rotate(task_id, file_content: bytes, schema):
    rotateDegrees = schema.rotateDegrees

    # Get the original name
    og_filename = tasks_status[task_id]["original_filename"] 
    
    # Define the new filename with task_id
    new_filename = f"{task_id}_{og_filename}"
    save_path = ROTATED_SAVE_DIR / new_filename

    # Update task status to "In Progress"
    tasks_status[task_id]["status"] = "In Progress"
    tasks_status[task_id]["filename"] = new_filename
    tasks_status[task_id]["task_name"] = "Rotate"
    tasks_status[task_id]["progress"] = 0

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 25

    # Rotate the photo using rotateDegrees
    image = Image.open(BytesIO(file_content))
    rotated_image = image.rotate(rotateDegrees, expand=True)

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 50
    
    # Ensure the directory exists
    ROTATED_SAVE_DIR.mkdir(parents=True, exist_ok=True)

    # Save the rotated image to the directory
    with save_path.open("wb") as buffer:
        rotated_image.save(buffer, format=image.format)

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 75
    time.sleep(1)  # Simulate work being done

    # Update task status to completed
    tasks_status[task_id]["status"] = "Completed"
    tasks_status[task_id]["progress"] = 100

    return {
        "msg": f"{og_filename} successfully rotated.",
        "file_url": f"/{api}/rotatedImages/{new_filename}"
    }
