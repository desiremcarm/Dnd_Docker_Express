window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('classesBtn').addEventListener('click', async () => {
    try {
      const data = await getAll('/classes');
      if (data) paint(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  });

  document.getElementById('spellsBtn').addEventListener('click', async () => {
    try {
      const data = await getAll('/spells');
      if (data) paint(data);
    } catch (error) {
      console.error('Error fetching spells:', error);
    }
  });

  document.getElementById('monstersBtn').addEventListener('click', async () => {
    try {
      const data = await getAll('/monsters');
      if (data) paint(data);
    } catch (error) {
      console.error('Error fetching monsters:', error);
    }
  });

  document
    .getElementById('getClassByIndex')
    .addEventListener('click', async () => {
      const className = document.getElementById('className').value;
      document.getElementById('className').value = '';
      try {
        const data = await getOne(className);
      } catch (error) {
        console.error('Error fetching monsters:', error);
      }
    });
});

// GET ONE
async function getOne(className) {
  const response = await fetch(`/classes/${className}`);
  const data = await response.json();
  console.log(data);
  return data;
}

// GET ALL
async function getAll(route) {
  const response = await fetch(route);
  const data = await response.json();
  console.log(data);
  return data;
}

// PAINT RESULTS
function paint(data) {
  const resultContainer = document.getElementById('results');
  // Cleaning previous results
  resultContainer.innerHTML = '';

  // If there is no data
  if (!data || data.length === 0) {
    resultContainer.innerHTML = `<p>There were no results... 😢</p>`;
  }

  data.forEach((element) => {
    const API_PREFIX = 'https://www.dnd5eapi.co';

    const container = document.createElement('div');

    container.classList.add('result');

    const hg = document.createElement('hgroup');

    const name = document.createElement('p');
    const url = document.createElement('a');

    name.classList.add('pico-color-pink-500');

    name.innerHTML = `📍 ${element.name}`;

    hg.appendChild(name);

    url.href = `${API_PREFIX}${element.url}`;
    url.innerHTML = `🪄 ${element.url}`;

    hg.appendChild(url);

    container.appendChild(hg);

    resultContainer.appendChild(container);
  });
}
