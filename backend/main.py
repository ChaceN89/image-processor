from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import imgRouter
from fastapi.staticfiles import StaticFiles # for mounting files
from pathlib import Path
from globals import host # the host running the frontend

# import the folders to store images 
from taskManager import  RESIZED_DIR, ENHANCED_DIR, ROTATED_DIR, FLIPPED_DIR, CONVERTED_DIR

# create a fastapi app
app = FastAPI()

# Ensure directories exist before mount
RESIZED_DIR.mkdir(parents=True, exist_ok=True)
ENHANCED_DIR.mkdir(parents=True, exist_ok=True)
ROTATED_DIR.mkdir(parents=True, exist_ok=True)
FLIPPED_DIR.mkdir(parents=True, exist_ok=True)
CONVERTED_DIR.mkdir(parents=True, exist_ok=True)

# set up middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[host],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# add the routers to the system 
app.include_router(imgRouter.router, prefix="/api")  # Include imgRouter with /api prefix

# Mount the various image folders within the images folder
app.mount("/resizedImages", StaticFiles(directory="images/resizedImages"), name="resizedImages")
app.mount("/enhancedImages", StaticFiles(directory="images/enhancedImages"), name="enhancedImages")

# start the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
