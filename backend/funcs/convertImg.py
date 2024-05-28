from taskManager import tasks_status
from PIL import Image
from io import BytesIO
import time
from pathlib import Path
from globals import api

# Directory for these images
CONVERTED_SAVE_DIR = Path("./images/convertedImages")

# Function to convert the image format while also keeping track of the task progress
def convert(task_id, file_content: bytes, schema):
    convertTo = schema.convertTo

    # Get the original name
    og_filename = tasks_status[task_id]["original_filename"] 
    
    # Define the new filename with task_id and new extension
    new_filename = f"{task_id}_{Path(og_filename).stem}.{convertTo.lower()}"
    save_path = CONVERTED_SAVE_DIR / new_filename

    # Update task status to "In Progress"
    tasks_status[task_id]["status"] = "In Progress"
    tasks_status[task_id]["filename"] = new_filename
    tasks_status[task_id]["task_name"] = "Convert"
    tasks_status[task_id]["progress"] = 0

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 25

    # Convert the image to the new format
    image = Image.open(BytesIO(file_content))

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 50
    
    # Ensure the directory exists
    CONVERTED_SAVE_DIR.mkdir(parents=True, exist_ok=True)

    # Save the converted image to the directory
    with save_path.open("wb") as buffer:
        image.save(buffer, format=convertTo.upper())

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 75
    time.sleep(1)  # Simulate work being done

    # Update task status to completed
    tasks_status[task_id]["status"] = "Completed"
    tasks_status[task_id]["progress"] = 100

    return {
        "msg": f"{og_filename} successfully converted to {convertTo}.",
        "file_url": f"/{api}/convertedImages/{new_filename}"
    }
