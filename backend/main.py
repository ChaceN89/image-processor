from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import imgRouter
from fastapi.staticfiles import StaticFiles # for mounting files
from globals import host

# create a fastapi app
app = FastAPI()

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
