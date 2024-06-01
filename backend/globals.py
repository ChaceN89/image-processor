# the host(frontend) and the location of this api/server
import os
# for enviroment variables
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Read environment variables with fallback values for local development
client = os.getenv('CLIENT', 'http://localhost:3000')
api = os.getenv('API', 'http://localhost:8000')
