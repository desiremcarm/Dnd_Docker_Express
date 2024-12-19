const classRouter = require('./classes.router');
const spellsRouter = require('./spells.router');
const monstersRouter = require('./monsters.router');

// APP ROUTES
function routerApi(app) {
  app.use('/classes', classRouter);
  app.use('/classes/:name', classRouter);
  app.use('/spells', spellsRouter);
  app.use('/spells/:name', spellsRouter);
  app.use('/monsters', monstersRouter);
  app.use('/monsters/:name', monstersRouter);
}

module.exports = routerApi;
