const express = require('express');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const URL = 'https://www.dnd5eapi.co/api/spells';

const router = express.Router();

router.get('/', async function (req, res) {
  const options = {
    method: 'GET',
  };

  try {
    let response = await fetch(URL, options);
    response = await response.json();
    const limitedResults = response.results.slice(0, 10);
    res.status(200).json(limitedResults);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

module.exports = router;
