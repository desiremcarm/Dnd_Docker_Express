const express = require('express');
// es6 syntax
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const URL = 'https://www.dnd5eapi.co/api/classes/druid';

const router = express.Router();

router.get('/', async function (req, res) {
  const options = {
    method: 'GET',
  };

  // promise syntax
  fetch(URL, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error('error:' + err));
  try {
    let response = await fetch(URL, options);
    response = await response.json();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

module.exports = router;
