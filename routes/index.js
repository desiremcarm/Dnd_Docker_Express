const classRouter = require('./classes.router');

function routerApi(app) {
  app.use('/classes', classRouter);
}

module.exports = routerApi;
