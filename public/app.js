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
        paintSingleClass(data);
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

// PAINT SINGLE CLASS
function paintSingleClass(data) {
  // TODO ❓ CHANGING THIS FOR A TEMPLATE?

  const resultContainer = document.getElementById('singleResults');
  // Cleaning previous results
  resultContainer.innerHTML = '';

  // If there is no data
  if (!data || data.length === 0) {
    resultContainer.innerHTML = `<p>There were no results... 😢</p>`;
  }

  const API_PREFIX = 'https://www.dnd5eapi.co';

  const container = document.createElement('article');

  const name = document.createElement('h4');
  name.innerHTML = `${data.name}`;

  container.appendChild(name);

  // PROFICIENCIES
  const spellcast_title = document.createElement('h6');
  spellcast_title.innerHTML = 'Proficiencies';

  container.appendChild(spellcast_title);

  const prof_ul = document.createElement('ul');

  data.proficiencies.forEach((element) => {
    const prof_li = document.createElement('li');
    prof_li.classList.add('singleResult');

    const prof_name = document.createElement('p');
    prof_name.innerHTML = `${element.name}`;
    prof_name.classList.add('pico-color-pink-500');

    prof_li.appendChild(prof_name);

    prof_ul.appendChild(prof_li);
  });

  container.appendChild(prof_ul);

  // STARTING EQ
  const star_eq_title = document.createElement('h6');
  star_eq_title.innerHTML = 'Starting equipment options';

  container.appendChild(star_eq_title);

  const st_eq_ul = document.createElement('ul');

  data.starting_equipment_options.forEach((element) => {
    const st_eq_li = document.createElement('li');
    st_eq_li.classList.add('singleResult');

    const st_eq_name = document.createElement('p');
    st_eq_name.innerHTML = `${element.desc}`;
    st_eq_name.classList.add('pico-color-pink-500');

    st_eq_li.appendChild(st_eq_name);

    st_eq_ul.appendChild(st_eq_li);
  });

  container.appendChild(st_eq_ul);

  // ADDING EVERYTHING ELSE
  resultContainer.appendChild(container);
}
