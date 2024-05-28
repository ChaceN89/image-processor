from taskManager import tasks_status
from PIL import Image
from io import BytesIO
import time
from pathlib import Path
from globals import api

# the directory for these images
SAVE_DIR = Path("./images/resizedImages")

def resize(task_id, file_content: bytes, schema):
    resizeWidth = schema.resizeWidth
    resizeHeight = schema.resizeHeight

    # get the original name
    og_filename = tasks_status[task_id]["original_filename"] 
    
    # Define the new filename with task_id
    new_filename = f"{task_id}_{og_filename}"
    save_path = SAVE_DIR / new_filename

    # Update task status to "In Progress"
    tasks_status[task_id]["status"] = "In Progress"
    tasks_status[task_id]["filename"] = new_filename
    tasks_status[task_id]["task_name"] = "Resize"
    tasks_status[task_id]["progress"] = 0

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 25

    # Resize the photo related to the width and height
    image = Image.open(BytesIO(file_content))
    resized_image = image.resize((resizeWidth, resizeHeight), Image.LANCZOS)

    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 50
    
    # # Save the file to the directory
    # with open(save_path, "wb") as buffer:
    #     buffer.write(file_content)

    # Save the resized image to the directory
    with open(save_path, "wb") as buffer:
        resized_image.save(buffer, format=image.format)

    
    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 75
    time.sleep(1)  # Simulate work being done

    # Update task status to completed
    tasks_status[task_id]["status"] = "Completed"
    tasks_status[task_id]["progress"] = 100

    return {
        "msg": f"{og_filename} successfully resized.",
        "file_url": f"/{api}/resizedImages/{new_filename}"
    }