const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.taskname) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const task = {
      taskname: req.body.taskname,
          };
  
    // Save Tutorial in the database
    Task.create(task)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Task."
        });
      });
  };

  exports.findAll = (req, res) => {
    const taskname = req.query.taskname;
    var condition = taskname ? { taskname: { [Op.like]: `%${taskname}%` } } : null;
  
    Task.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tasks."
        });
      });
  };

  exports.findOne=(req, res)=>{
    const id=req.params.id;

    Task.findByPk(id)
    .then(data=>{
        if(data){
            res.send(data);
        }
        else{
            res.status(404).send({
                message:`Cannot find Task with id=${id}`
            })
        }
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).send({
            message:`Error Retrieving Task with id=${id}`
        })
    })
  }

  exports.deleteAll=(req, res)=>{
    Task.destroy({
        where:{},
        truncate:false
    })
    .then(nums=>{
        res.send({message:`${nums} tasks deleted successfully`})
    })
    .catch(error=>{
        res.status(500).send({
            message:error.message || "Some error occurred while removing all tasks."
        })
    })
  }

  exports.delete=(req, res)=>{
    const id=req.params.id;
    Task.destroy({
        where:{id:id},
    })
    .then((num)=>{
        if(num==1){
            res.send({message:"Task deleted successfully!"})
        }
        else{
            res.send({message:"Some error occurred while deleting task"})
        }
    })
    .catch(error=>{
        res.status(500).send({
            message:error.message || "Some error occurred while removing task."
        })
    })
  }

  exports.update=(req,res)=>{
    const id=req.params.id;
    Task.update(req.body,{
      where:{id:id}
    })
    .then((num)=>{
      if(num==1){
        res.send({
          message:`${num} Task updated successfully`
        })
      }
        else{
          res.send({
            message:`Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
          })
        }
      
    })
    .catch((error)=>{
      res.status(500).send({
        message:`Error updating Task with id=${id}`
      })
    })
  }