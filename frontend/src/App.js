import { useEffect, useState } from "react";
import axios from "axios";

import NoteLists from "./components/note_lists/NoteLists";

import "./index.css";

const URL = "http://localhost:8000/api";

function App() {
  const [toDoData, setToDoData] = useState({ title: null, description: null });
  console.log("🚀 ~ file: App.js:10 ~ App ~ data:", toDoData);

  const [lists, setLists] = useState([]);
  console.log("🚀 ~ file: App.js:10 ~ App ~ list:", lists);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setLists(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const addTodo = async () => {
    if (!toDoData.title || !toDoData.description) {
      alert("Please enter title and description");
      return;
    }

    try {
      const response = await axios.post(`${URL}/todo`, toDoData);
      setLists(prevLists => [...prevLists, response.data]);
      alert("Successfully added to the list!");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to add to the list. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 rounded-lg p-8 w-[32rem]">
        <h1 className="text-3xl font-bold mb-8 text-center">Fast-React</h1>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Title"
            onChange={e => setToDoData({ ...toDoData, title: e.target.value })}
            value={toDoData.title}
            className="rounded-lg border-gray-300 border p-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="text"
            placeholder="Description"
            onChange={e =>
              setToDoData({ ...toDoData, description: e.target.value })
            }
            value={toDoData.description}
            className="rounded-lg border-gray-300 border p-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="button"
            onClick={addTodo}
            className="bg-sky-700 px-6 py-3 text-white hover:bg-sky-500 rounded-lg">
            Add
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold mt-8 mb-4">Notes</h2>
          {<NoteLists lists={lists} />}
        </div>
      </div>
    </div>
  );
}

export default App;
