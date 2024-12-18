const express = require('express');
const app = express();
const PORT = 3001;
const routerApi = require('./routes');

app.get('/', (req, res) => {
  res.send('Hello, world! 🫡👋🏻');
});

routerApi(app);

app.listen(PORT, () => {
  console.log('✅');
});
