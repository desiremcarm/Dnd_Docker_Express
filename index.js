const express = require('express');
const app = express();
const PORT = 3001;
const routerApi = require('./routes');
const path = require('path');

// GETTING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

routerApi(app);

app.listen(PORT, () => {
  console.log('✅');
});
