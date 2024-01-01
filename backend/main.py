from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException

from model import Todo

from database import (
    fetch_one_todo,
    fetch_all_todos, 
    create_todo, 
    update_todo,  
    remove_todo, 
)


# App Object
app = FastAPI()

origins = ["https://localhost:3000", "http://localhost:3000"]


app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)


@app.get("/api")
async def read_root():
    response = await fetch_all_todos()
    return response

@app.get("/api/todo")
async def get_todo_list():
    response = await fetch_all_todos()
    return response

@app.get("/api/todo/{title}", response_model=Todo)
async def get_todo_list_by_title(title):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, f"There is no item with the title {title}")

@app.post("/api/todo", response_model=Todo)
async def create_todo_list(todo : Todo):            
    # response = await create_todo(todo.dict())
    response = await create_todo(todo.model_dump())
    if response:
        return response
    raise HTTPException(400, "Something went wrong / Bad Request")
        
    
@app.put("/api/todo/{title}", response_model=Todo)
async def put_todo_list(title:str, desc:str):
    response = await update_todo(title, desc)
    if response:
        return response
    raise HTTPException(404, f"There is no item with the title {title}")

@app.delete("/api/todo/{title}")
async def delete_todo_list(title):
    response = await remove_todo(title)
    if response:
        return {"message": "Successfully deleted"}
    raise HTTPException(404, f"There is no item with the title {title}")


