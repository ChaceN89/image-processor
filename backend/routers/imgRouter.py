from fastapi import APIRouter, Depends, UploadFile, File
from schemas.imgSchemas import AlterImg
from fastapi import HTTPException


# from functions.imgFuncs import resize
# from backend.funcs.resizeImage import resize, enhance, convert, rotate, flip
from funcs import resizeImg, enhanceImg, convertImg, positionImg
from taskManager import start_task, tasks_status

# set up the router for image processing with prefix and tags(for swagger UI)
router = APIRouter(
    prefix="/img",  # all routes here are /api/img/....
    tags=['Images']  # every route is part of the Images tag for Swagger UI organization
)

# route to alter an image file based on a the specified operation 
# frontend sends a task ID as well 
@router.post("/alter-img/{task_id}")
async def alter_img(task_id: str, file: UploadFile = File(...), schema: AlterImg = Depends()):
    operation_map = {
        "Resize": resizeImg.resize,
        "Enhance": enhanceImg.enhance,
        "Convert": convertImg.convert,
        "Rotate": positionImg.rotate,
        "Flip": positionImg.flip
    }
    # get the correct function to use 
    task_function = operation_map.get(schema.operation)

    # Read file content in the main thread
    file_content = await file.read()

    # if found start a thread running that specific task
    if task_function:
        return start_task(task_id, schema.operation, file.filename, lambda: task_function(task_id, file_content, schema))
    else:
        return {"status": "Invalid operation", "task_id": task_id}


# get the current status of a task 
# if complete the results of the task will be sent
@router.get("/task-status/{task_id}")
async def get_task_status(task_id: str):
    # Access the task directly from the dictionary using task_id
    task = tasks_status.get(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

# view the current task list with all tasks stored
@router.get("/task-list/")
async def get_task_list():
    return tasks_status


