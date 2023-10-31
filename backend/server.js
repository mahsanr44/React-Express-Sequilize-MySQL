const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;


app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db=require('./app/models');
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  })
    .catch((error)=>{
        console.log(error);
    })

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });
  
  require("./app/routes/task.route")(app);

  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });