
from pydantic import BaseModel, Field
from typing import Optional

class AlterImg(BaseModel):
    operation: str  # resize, enhance, convert, rotate, flip
    resizeHeight: Optional[int] = None 
    resizeWidth: Optional[int] = None 
    enhanceFactor: Optional[float] = 1.0
    convertTo: Optional[str] = None
    rotateDegrees: Optional[int] = None
    flipDirection: Optional[str] = None


