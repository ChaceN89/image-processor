from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import imgRouter
from fastapi.staticfiles import StaticFiles # for mounting files

# create a fastapi app
app = FastAPI()

# set up middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# add the routers to the system 
app.include_router(imgRouter.router, prefix="/api")  # Include imgRouter with /api prefix

# Mount the resizedImages directory to the /images URL path
app.mount("/images", StaticFiles(directory="resizedImages"), name="images")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
