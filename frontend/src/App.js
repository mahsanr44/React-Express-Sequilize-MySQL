import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [taskname, setTask] = useState("");
  const [fetchedTask, setFetchedTask] = useState([]);

  useEffect(() => {
    getTask();
  }, []);

  // Setters for Task
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // API call for storing Task
  const storeTask = (e) => {
    e.preventDefault();
    const newTask = {
      taskname,
    };
    if (newTask.taskname === "") {
      toast.error("Please Enter the Task Name!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return;
    }
    axios
      .post("http://localhost:8080/api/tasks", newTask)
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
      .get("http://localhost:8080/api/tasks")
      .then((response) => {
        console.log(response.data);
        setFetchedTask(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // API call for deleting data
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8080/api/tasks/${id}`)
      .then((response) => {
        getTask();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // API call for deleting all data
  const deleteAllTasks = () => {
    axios
      .delete(`http://localhost:8080/api/tasks`)
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
    if (updatedTask === null) {
      return;
    }
    const newUpdatedTask = {
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
        <h1 className="text-2xl font-bold mb-5 bg-gray-200 rounded-sm p-1">
          Todo App
        </h1>
        <form className="flex items-center justify-center gap-1">
          <input
            className="border-2 border-gray-700	rounded-md p-1"
            placeholder="✍️ Add Task"
            type="text"
            name="taskname"
            value={taskname}
            onChange={handleInputChange}
          />
          <button
            className="border-2 bg-green-500 border-green-600 rounded-md p-1 text-white"
            onClick={storeTask}
          >
            Store Data
          </button>
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />{" "}
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
              className="flex gap-5 justify-center items-center m-3 "
            >
              <span className="font-semibold text-lg">
              {++index + ". "}
              </span>
              <span className="mr-10 font-semibold text-lg text-gray-800">
                {item.taskname}
              </span>
              <button
                className="border-2 bg-green-500 border-green-700 rounded-md p-1  w-16 text-white"
                onClick={() => updateData(item)}
              >
                Edit
              </button>
              <button
                className="border-2 bg-red-500 border-red-700 rounded-md p-1 w-16 text-white"
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
              className="border-2 mt-5 bg-red-500 border-red-700 rounded-md p-1  text-white"
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

export default App;
