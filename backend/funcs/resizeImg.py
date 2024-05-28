import shutil
import time
from taskManager import tasks_status
from pathlib import Path
from fastapi import UploadFile



SAVE_DIR = Path("./resizedImages")

def resize(task_id, file: UploadFile, schema):

    resizeWidth = schema.resizeWidth
    resizeHeight = schema.resizeHeight

    # Ensure the save directory exists
    SAVE_DIR.mkdir(parents=True, exist_ok=True)
    
    # Define the new filename with task_id
    new_filename = f"{task_id}_{file.filename}"
    save_path = SAVE_DIR / new_filename

    # Update task status to "In Progress"
    tasks_status[task_id]["status"] = "In Progress"
    tasks_status[task_id]["filename"] = new_filename
    tasks_status[task_id]["task_name"] = "Resize"
    tasks_status[task_id]["progress"] = 0

    print(f"\n\nStarting resize task: {task_id}, file: {file.filename}, width: {resizeWidth}, height: {resizeHeight}\n\n")
    print(f"\n\n file: {file}\n\n")


    # Simulate processing
    for i in range(1, 11):
        time.sleep(0.4)  # Simulate work being done
        tasks_status[task_id]["progress"] = i * 10
    
    # Save the file to the directory
        # with open(save_path, "wb") as buffer:
        #     buffer.write(file.file.read())

        # # Reset file pointer for further operations if needed
        # file.file.seek(0) 


    
    # Update task status to completed
    tasks_status[task_id]["status"] = "Completed"
    tasks_status[task_id]["progress"] = 100

    return {
        "msg": f"{file.filename} successfully resized and saved as {new_filename}",
        "file_url": f"/api/img/download/{new_filename}"
    }