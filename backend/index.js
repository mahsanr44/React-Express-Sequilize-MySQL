const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 4000;

// CORS or Cross-Origin Resource Sharing in Node. js is a mechanism by which a 
// front-end client can make requests for resources to an external back-end server.
app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

fs.writeFileSync("data.json", "[]");

// Helper function to generate a unique ID
const generateUniqueID = () => {
  const rawData = fs.readFileSync("data.json");
  const data = JSON.parse(rawData);
  const maxID = data.reduce((max, item) => (item.id > max ? item.id : max), 0);
  return maxID + 1;
};

// Store Data API
app.post("/storeTask", (req, res) => {
  const newData = req.body;

  const rawData = fs.readFileSync("data.json");
  const data = JSON.parse(rawData);
  newData.id = generateUniqueID();
  
  data.push(newData);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.status(200).json({ message: "Task stored successfully" });
});

// Fetch Data API
app.get("/getTask", (req, res) => {
  const rawData = fs.readFileSync("data.json");
  const data = JSON.parse(rawData);
  res.json(data);
});


// Delete Task with ID API
app.delete("/deleteTask/:id", (req, res) => {
  const rawData = fs.readFileSync("data.json");
  const data = JSON.parse(rawData);
  const userId = parseInt(req.params.id);
  const index = data.findIndex((item) => item.id === userId);

  if (index !== -1) {
    const deleted = data.splice(index, 1)[0];
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.status(200).json({ message: "Task Deleted successfully", deleted: deleted });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Delete all Tasks API

app.delete("/deleteAllTasks", (req, res) => {
  const rawData = fs.readFileSync("data.json");
  const data = JSON.parse(rawData);
  data.splice(0, data.length);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.status(200).json({ message: "All Tasks Deleted successfully" });
});

// Update Data API
app.put("/updateTask/:id", (req, res) => {
  const rawData = fs.readFileSync("data.json");
  const data = JSON.parse(rawData);
  const userId = parseInt(req.params.id);
  const index = data.findIndex((item) => item.id === userId);
  const newData = req.body;
  data[index].task = newData.task;
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.status(200).json({ message: "Task updated successfully", data: data});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
