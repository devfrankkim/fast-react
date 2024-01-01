# pydantic - auto create JSON schemas from the model.
from pydantic import BaseModel

class Todo(BaseModel):
    title: str
    description: str