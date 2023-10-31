module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
  
    var router = require("express").Router();

router.post("/", tasks.create);

router.get("/", tasks.findAll);

router.get("/:id", tasks.findOne);

router.delete("/", tasks.deleteAll);

router.delete("/:id", tasks.delete);

app.use('/api/tasks', router);
}
