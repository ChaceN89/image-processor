# image-processor
A React and fastAPI app. Tasks are queued in the backend using multi threading and storage. The frontend can check the statis of the tasks in the backend.

Could be adapted to a user authentication system where a user can access a list of there tasks and check there status. Could be used for tasks taht take a long time to complete. The image processing tasks in this application are simple and have sleep statements to simulate longer tasks.

## frontend 
- npm install
- npm start

## backend
- Create a virtual enviroment and install the libraries in the requirements.text file
- run 'uvicorn main:app --reload'
