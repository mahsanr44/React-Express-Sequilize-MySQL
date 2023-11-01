const express = require("express");
const cors = require("cors");
const db=require('./app/models');

const app = express();
const port = 8080;

app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  })
    .catch((error)=>{
        console.log(error);
    })
    require("./app/routes/task.route")(app);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });