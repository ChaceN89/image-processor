from concurrent.futures import ThreadPoolExecutor
from typing import Dict
from datetime import datetime

executor = ThreadPoolExecutor(max_workers=4)

# Store task progress in a dictionary
tasks_status: Dict[str, Dict[str, str]] = {}

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

def checkOldTasks():
    expiry_time = 1 # in mins

    # remove old tasks that are older than expiry_time old
    pass