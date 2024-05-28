from taskManager import tasks_status
import time


def set_initial_status(task_type, task_id, SAVE_DIR):

    # get the original name
    og_filename = tasks_status[task_id]["original_filename"] 
    
    # Define the new filename with task_id
    new_filename = f"{task_id}_{og_filename}"
    save_path = SAVE_DIR / new_filename

    # Update task status to "In Progress"
    tasks_status[task_id]["status"] = "In Progress"
    tasks_status[task_id]["filename"] = new_filename
    tasks_status[task_id]["task_name"] = task_type
    tasks_status[task_id]["progress"] = 0


    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 25

    return save_path, new_filename, og_filename


def set_mid_status(task_id):
    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 50
    time.sleep(1)  # Simulate work being done


def set_end_status(task_id):
    time.sleep(1)  # Simulate work being done
    tasks_status[task_id]["progress"] = 75
    time.sleep(1)  # Simulate work being done
    
    # Update task status to completed
    tasks_status[task_id]["status"] = "Completed"
    tasks_status[task_id]["progress"] = 100