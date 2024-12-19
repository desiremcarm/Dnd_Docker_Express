const express = require('express');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const URL = 'https://www.dnd5eapi.co/api/monsters';

const router = express.Router();

router.get('/', async function (req, res) {
  const options = {
    method: 'GET',
  };

  try {
    let response = await fetch(URL, options);

    response = await response.json();

    // Shuffle array
    const shuffledResults = response.results.sort(() => Math.random() - 0.5);

    //Getting 15 first elements
    const randomResults = shuffledResults.slice(0, 15);

    res.status(200).json(randomResults);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

router.get('/:monsterName', async function (req, res) {
  const monsterName = req.params.monsterName;

  try {
    const response = await fetch(`${URL}/${monsterName}`, { method: 'GET' });

    if (!response.ok) {
      return res.status(response.status).json({ msg: 'Monster not found.' });
    }

    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Internal Server Error.' });
  }
});

module.exports = router;
