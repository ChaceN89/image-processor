
RUN THE APPLICATION 

avtivate virtual env 
source env/bin/activate


uvicorn main:app --reload


http://localhost:8000/docs  to access the router using swagger UI


testing 
curl -X POST "http://127.0.0.1:8000/process-image/" -F "file=@/path/to/image.png" -H "Content-Type: application/json" -d '{"convert_format": true, "type_to_convert_to": "JPEG", "enhance": true, "resize": true, "resize_width": 100, "resize_height": 100}'
