from taskManager import tasks_status
from PIL import Image
from io import BytesIO
import time
from pathlib import Path
from globals import api

# Directory for these images
FLIPPED_SAVE_DIR = Path("./images/flippedImages")

# Function to flip the image while also keeping track of the task progress
def flip(task_id, file_content: bytes, schema):
    flipDirection = schema.flipDirection

    # Get the original name
    og_filename = tasks_status[task_id]["original_filename"] 
    
    # Define the new filename with task_id
    new_filename = f"{task_id}_{og_filename}"
    save_path = FLIPPED_SAVE_DIR / new_filename

    # Update task status to "In Progress"
    tasks_status[task_id]["status"] = "In Progress"
    tasks_status[task_id]["filename"] = new_filename
    tasks_status[task_id]["task_name"] = "Flip"
    tasks_status[task_id]["progress"] = 0

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 25

    # Flip the image based on the direction
    image = Image.open(BytesIO(file_content))
    if flipDirection == "horizontal":
        flipped_image = image.transpose(Image.FLIP_LEFT_RIGHT)
    elif flipDirection == "vertical":
        flipped_image = image.transpose(Image.FLIP_TOP_BOTTOM)
    else:
        raise ValueError("Invalid flip direction")

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 50
    
    # Ensure the directory exists
    FLIPPED_SAVE_DIR.mkdir(parents=True, exist_ok=True)

    # Save the flipped image to the directory
    with save_path.open("wb") as buffer:
        flipped_image.save(buffer, format=image.format)

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 75
    time.sleep(1)  # Simulate work being done

    # Update task status to completed
    tasks_status[task_id]["status"] = "Completed"
    tasks_status[task_id]["progress"] = 100

    return {
        "msg": f"{og_filename} successfully flipped.",
        "file_url": f"/{api}/flippedImages/{new_filename}"
    }
