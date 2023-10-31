import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function Temp() {
  const [task, setTask] = useState("");
  const [fetchedTask, setFetchedTask] = useState([]);

  // Setters for Task
  const handleInputChange = (e) => {
    const task = e.target;
    setTask(task.value);
  };

  // API call for storing Task
  const storeTask = (e) => {
    e.preventDefault();
    const newTask = {
      task,
    };
    if (newTask.task === "") {
      alert("Please Enter the Task Name");
      return;
    }
    axios
      .post("http://localhost:4000/storeTask", newTask)
      .then((response) => {
        console.log(response.data);
        getTask();
        setTask("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // API call for fetching Task
  const getTask = () => {
    axios
      .get("http://localhost:4000/getTask")
      .then((response) => {
        setFetchedTask(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTask();
  }, []);

  // API call for deleting data
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:4000/deleteTask/${id}`)
      .then((response) => {
        getTask();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteAllTasks = () => {
    axios
      .delete(`http://localhost:4000/deleteAllTasks`)
      .then((response) => {
        console.log("All Tasks Deleted Successfully");
        getTask();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API call for updating data
  const updateData = (item) => {
    const updatedTask = prompt("Enter Updated Task Name:", item.task);

    var newUpdatedTask = {
      task: updatedTask,
    };

    axios
      .put(`http://localhost:4000/updateTask/${item.id}`, newUpdatedTask)
      .then((response) => {
        getTask();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <div className="flex justify-center items-center mt-5 flex-col">
        <h1 className="text-2xl font-bold mb-5 bg-gray-200">Todo App</h1>
        <form className="flex items-center justify-center gap-1">
          <input
            className="border-2 border-gray-700	rounded-md p-1"
            placeholder="Enter Task"
            type="text"
            name="task"
            value={task}
            onChange={handleInputChange}
          />
          <button
            className="border-2 bg-green-500 border-green-600 rounded-md p-1 text-white"
            onClick={storeTask}
          >
            Store Data
          </button>
        </form>
        <br />
      </div>
      <div className="flex justify-center items-center"></div>
      <div className="flex justify-center items-center flex-col mt-10">
        <h2 className="text-xl font-bold">Todo List:</h2>
        <ul>
          {fetchedTask.map((item, index) => (
            <li
              key={index}
              className="flex gap-5 justify-center items-center m-3 border  rounded-lg p-0.5"
            >
              <span className="mr-10">
                {++index + ". "}
                {item.task}
              </span>
              <button
                className="border-2 bg-blue-500 border-blue-700 rounded-md p-1  text-white"
                onClick={() => updateData(item)}
              >
                Edit
              </button>
              <button
                className="border-2 bg-red-500 border-red-700 rounded-md p-1  text-white"
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div>
          {fetchedTask.length > 0 ? (
            <button
              className="border-2 mt-5 bg-red-700 border-red-900 rounded-md p-1  text-white"
              onClick={deleteAllTasks}
            >
              Delete All Tasks
            </button>
          ) : (
            <h1 className="font-semibold mt-5 text-red-500">
              No Record Found!
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Temp;
