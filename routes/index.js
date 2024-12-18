const classRouter = require('./classes.router');

function getClasses(app) {
  app.use('/classes', classRouter);
}

module.exports = getClasses;
