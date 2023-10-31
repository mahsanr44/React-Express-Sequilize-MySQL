module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    taskname: {
      type: Sequelize.STRING,
    },
  });

  return Task;
};
