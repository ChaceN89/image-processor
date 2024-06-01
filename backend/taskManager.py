from concurrent.futures import ThreadPoolExecutor
from typing import Dict
from datetime import datetime, timedelta
from pathlib import Path

executor = ThreadPoolExecutor(max_workers=4)

# Store task progress in a dictionary
tasks_status: Dict[str, Dict[str, str]] = {}

# for the max storage of tasks
MAX_TASKS = 3
TASK_EXPIRY_MINUTES = 1

# Define the directories
RESIZED_DIR = Path("images/resizedImages")
ENHANCED_DIR = Path("images/enhancedImages")
ROTATED_DIR = Path("images/rotatedImages")
FLIPPED_DIR = Path("images/flippedImages")
CONVERTED_DIR = Path("images/convertedImages")

# Function to start a task 
def start_task(task_id, task_name, filename, task_function):
    # Get current time 
    current_time = datetime.now()

    # Initialize the task with status "started"
    initial_task_info = {
        "status": "Started",
        "time_started": current_time.strftime("%Y-%m-%d %H:%M:%S"),
        "original_filename": filename,
        "task_name": task_name,
        "progress": 0,
    }
    tasks_status[task_id] = initial_task_info

    # check if there are any too old tasks that need to be deleted becuae they aren't useful anymore
    # clear old tasks before creating a new one
    check_old_tasks()

    # delete files that aren't related to a task and havent been deleted yet - this is a fail safe  
    delete_unassociated_files()
    
    # Start the task using the task function
    future = executor.submit(task_function)
    
    # Function to get the results of the task for the callback 
    def update_status(f):
        if f.exception():
            tasks_status[task_id]["status"] = "Failed"
            tasks_status[task_id]["error"] = str(f.exception())
        else:
            # Get the current time the task ended
            end_time = datetime.now()

            # Get the result of the task 
            result = f.result()

            # Update the saved task 
            tasks_status[task_id]["status"] = "Completed"
            tasks_status[task_id]["time_ended"] = end_time.strftime("%Y-%m-%d %H:%M:%S")
            tasks_status[task_id]["progress"] = 100
            tasks_status[task_id]["result"] = result
    
    # Get the callback of the task to change status of the task 
    future.add_done_callback(update_status)

    # Inform that the task has started
    return {"status": f"{task_name} Task Started", "task_id": task_id}


# function to check is there are too many tasks and check if current tasks are too old
def check_old_tasks():
    current_time = datetime.now()
    expiry_duration = timedelta(minutes=TASK_EXPIRY_MINUTES)

    # Remove tasks older than expiry_duration
    expired_tasks = [task_id for task_id, task in tasks_status.items() 
                     if datetime.strptime(task["time_started"], "%Y-%m-%d %H:%M:%S") < current_time - expiry_duration]
    
    for task_id in expired_tasks:
        print("\n\n tasks to delete \n")
        delete_associated_file(task_id, tasks_status[task_id]["original_filename"], tasks_status[task_id]["task_name"])
        del tasks_status[task_id]

    # If there are still too many tasks, remove the oldest
    while len(tasks_status) > MAX_TASKS:
        print("too many tasks")
        oldest_task_id = min(tasks_status, key=lambda task_id: datetime.strptime(tasks_status[task_id]["time_started"], "%Y-%m-%d %H:%M:%S"))
        delete_associated_file(oldest_task_id, tasks_status[oldest_task_id]["original_filename"], tasks_status[oldest_task_id]["task_name"])
        del tasks_status[oldest_task_id]

# fucntion to delete images related to the deleted tasks
def delete_associated_file(task_id, filename, task_name):
    if task_name == "Resize":
        file_path = RESIZED_DIR / f"{task_id}_{filename}"
    elif task_name == "Enhance":
        file_path = ENHANCED_DIR / f"{task_id}_{filename}"
    elif task_name == "Rotate":
        file_path = ROTATED_DIR / f"{task_id}_{filename}"
    elif task_name == "Flip":
        file_path = FLIPPED_DIR / f"{task_id}_{filename}"
    elif task_name == "Convert":
        file_path = CONVERTED_DIR / f"{task_id}_{filename}"
    
    else:
        return
    
    try:
        if file_path.exists():
            file_path.unlink()  # Delete the file
    except Exception as e:
        print(f"Error deleting file {file_path}: {e}")


# Function to cancel a specific task and delete associated files
def cancel_task(task_id: str):
    task = tasks_status.get(task_id)
    if task:
        # Delete associated files
        delete_associated_file(task_id, task["original_filename"], task["task_name"])
        # Remove task from tasks_status
        del tasks_status[task_id]
        return {"status": "Task cancelled", "task_id": task_id}
    else:
        return {"status": "Task not found", "task_id": task_id}
    

# Function to delete images not associated with any task
def delete_unassociated_files():
    all_files = {
        "Resize": list(RESIZED_DIR.glob("*")),
        "Enhance": list(ENHANCED_DIR.glob("*")),
        "Rotate": list(ROTATED_DIR.glob("*")),
        "Flip": list(FLIPPED_DIR.glob("*")),
        "Convert": list(CONVERTED_DIR.glob("*"))
    }
    
    task_files = {
        "Resize": set(),
        "Enhance": set(),
        "Rotate": set(),
        "Flip": set(),
        "Convert": set()
    }
    
    # Collect all task-related files
    for task_id, task in tasks_status.items():
        task_name = task["task_name"]
        filename = task["original_filename"]
        if task_name in task_files:
            task_files[task_name].add(f"{task_id}_{filename}")
    
    # Delete unassociated files
    for task_name, files in all_files.items():
        for file_path in files:
            if file_path.name not in task_files[task_name]:
                try:
                    file_path.unlink()  # Delete the file
                    print(f"Deleted unassociated file {file_path}")
                except Exception as e:
                    print(f"Error deleting file {file_path}: {e}")