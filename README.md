# Image Processor

A frontend and backend application to queue tasks using multithreading. The application is for processing images, which showcases the task management.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contact](#contact)

## Description

The Image Processor application features a frontend built with React and TypeScript, and a backend built with FastAPI. The backend has a task manager that uses multithreading to run multiple tasks simultaneously, each with an ID to check the status of the tasks. This system can be applied to a user authentication system where users can run tasks and check their status at any time, independent of frontend API calls.

The application showcases various image processing tasks such as adjusting brightness, resizing, converting formats, and changing image orientation. The backend stores images, which can be accessed and managed. To save memory, images and their associated data are deleted at regular intervals when they are no longer in use.

## Features

- **Task Management:** Queue tasks using multithreading, allowing users to check the status of their tasks at any time.
- **Image Processing:** Perform operations such as brightness adjustment, resizing, format conversion, and orientation changes.
- **Image Storage:** Stores images in the backend that can be accessed and managed.
- **Memory Management:** Regularly deletes images and their associated task data when they are no longer in use to save memory.
- **User Authentication (Future Scope):** Adaptable to a user authentication system where users can manage their tasks.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Superset of JavaScript for static typing.
- **FastAPI:** Web framework for building APIs with Python.
- **Multithreading:** For handling multiple tasks concurrently.

## Installation

To run the project locally:

### Frontend

1. Clone the repository:
   ```sh
   git clone https://github.com/ChaceN89/image-processor.git
   ```
2. Navigate to the frontend directory:
   ```sh
   cd image-processor/frontend
   ```
3. Install the required dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

### Backend

1. Navigate to the backend directory:
   ```sh
   cd image-processor/backend
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate # On Windows use `venv\Scripts\activate`
   ```
3. Install the required dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```sh
   uvicorn main:app --reload
   ```

## Usage

The application allows users to perform various image processing tasks such as adjusting brightness, resizing, converting formats, and changing image orientation. The tasks are queued and processed in the background, and users can check the status of their tasks at any time.

## Deployment

The project is deployed on Netlify and can be accessed at the following link:

[Image Processor on Netlify](https://main--img-processor.netlify.app/)

It should be noted that the backend deployment spins down when not in use and takes a few minutes to start up when accessed. This means the data will take a few minutes time to load.

## Contact

Project Link: [https://github.com/ChaceN89/image-processor](https://github.com/ChaceN89/image-processor)

Website: [https://chacenielson.com](https://chacenielson.com)
