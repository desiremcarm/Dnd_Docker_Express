window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('classesBtn').addEventListener('click', async () => {
    try {
      const data = await getAll(API_CLASSES);
      if (data) paint(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  });

  document.getElementById('spellsBtn').addEventListener('click', async () => {
    try {
      const data = await getAll(API_SPELLS);
      if (data) paint(data);
    } catch (error) {
      console.error('Error fetching spells:', error);
    }
  });

  document.getElementById('monstersBtn').addEventListener('click', async () => {
    try {
      const data = await getAll(API_MONSTER);
      if (data) paint(data);
    } catch (error) {
      console.error('Error fetching monsters:', error);
    }
  });

  document
    .getElementById('getClassByIndex')
    .addEventListener('click', async () => {
      const className = getInputValue('className');

      clearInput('className');

      try {
        const data = await getSingleValue(API_CLASSES, className);
        paintClass(data);
      } catch (error) {
        paintClass(null, error.message);
      }
    });

  document
    .getElementById('getSpellByIndex')
    .addEventListener('click', async () => {
      const spellName = getInputValue('spellName');

      clearInput('spellName');

      try {
        const data = await getSingleValue(API_SPELLS, spellName);
        paintSpell(data);
      } catch (error) {
        paintSpell(null, error.message);
      }
    });

  document
    .getElementById('getMonsterByIndex')
    .addEventListener('click', async () => {
      const monsterName = getInputValue('monsterName');

      clearInput('getMonsterByIndex');

      try {
        const data = await getSingleValue(API_MONSTER, monsterName);
        console.log(data);
        paintMonster(data);
      } catch (error) {
        paintMonster(null, error.message);
      }
    });
});

// ************** VARIABLES

const API_PREFIX = 'https://www.dnd5eapi.co';
const API_MONSTER = '/monsters';
const API_SPELLS = '/spells';
const API_CLASSES = '/classes';

// ************** FETCH DATA

// GET SINGLE
async function getSingleValue(route, name) {
  try {
    const response = await fetch(`${route}/${name}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || `Value: "${name}" not found.`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// GET ALL
async function getAll(route) {
  const response = await fetch(route);
  const data = await response.json();
  return data;
}

// ************** PAINT RESULTS

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

// PAINT CLASS
function paintClass(data, error = null) {
  const resultContainer = document.getElementById('singleResults');

  validateSearch(data, error, resultContainer);

  const template = createTemplateForClass(data);

  resultContainer.innerHTML = template;
}

// PAINT SPELL
function paintSpell(data, error = null) {
  const resultContainer = document.getElementById('singleResults');

  validateSearch(data, error, resultContainer);

  const template = createTemplateForSpell(data);

  resultContainer.innerHTML = template;
}

// PAINT MONSTER
function paintMonster(data, error = null) {
  const resultContainer = document.getElementById('singleResults');

  validateSearch(data, error, resultContainer);

  const template = createTemplateForMonster(data);

  resultContainer.innerHTML = template;
}

// ************** AUX

// AUXILIAR
function createList(items, name) {
  return items
    .map(
      (item) =>
        `<li class="${name}"><p class="pico-color-pink-500">${item.name || item.desc}</p></li>`,
    )
    .join('');
}

function clearInput(id_name) {
  document.getElementById(id_name).value = '';
}

function getInputValue(name) {
  let valueName = document.getElementById(name).value;

  valueName = valueName.toLowerCase().trim().split(' ').join('-');

  return valueName;
}

// ************* VALIDATE

// VALIDATE INPUT
function validateSearch(data, error, container) {
  if (error) {
    container.innerHTML = `<p class="error">❌ ${error}</p>`;
    return;
  }

  if (!data || Object.keys(data).length === 0) {
    container.innerHTML = `<p>No results found... 😢</p>`;
    return;
  }
}

// ************* TEMPLATES

// CREATION OF TEMPLATE FOR MONSTER
function createTemplateForMonster(data) {
  const special_ab = createList(data.special_abilities, 'singleResult');
  const actions = createList(data.actions, 'singleResult');
  const legen_actions = createList(data.legendary_actions, 'singleResult');

  const classHTML = `
  <article>
    <h4>${data.name}</h4>
    <p><b>Size:</b> ${data.size}</p>
    <p><b>Type:</b> ${data.type}</p>
    <p><b>HP:</b> ${data.hit_points}</p>
    <p><b>Alignment:</b> ${data.alignment}</p>
    <h6>Special habilities</h6>
    <ul>${special_ab}</ul>
    <h6>Actions</h6>
    <ul>${actions}</ul>
    <h6>Legendary actions</h6>
    <ul>${legen_actions}</ul>
    <a href="${API_PREFIX}${data.url}">${data.url}</a>
  </article>
`;

  return classHTML;
}

// CREATION OF TEMPLATE FOR SPELL
function createTemplateForSpell(data) {
  const classes = createList(data.classes, 'singleResult');

  const classHTML = `
  <article>
    <h4>${data.name}</h4>
    <p>${data.desc}</p>
    <p><b>School:</b> ${data.school.name}</p>
    <p><b>Level:</b> ${data.level}</p>
    <p><b>Duration:</b> ${data.duration}</p>
    <h6>Classes</h6>
    <ul>${classes}</ul>
    <a href="${API_PREFIX}${data.url}">${data.url}</a>
  </article>
`;

  return classHTML;
}

// CREATION OF TEMPLATE FOR CLASS
function createTemplateForClass(data) {
  const proficienciesHTML = createList(data.proficiencies, 'singleResult');
  const startingEquipmentHTML = createList(
    data.starting_equipment_options,
    'singleResult',
  );

  const classHTML = `
    <article>
      <h4>${data.name}</h4>
      <h6>Proficiencies</h6>
      <ul>${proficienciesHTML}</ul>
      <h6>Starting Equipment Options</h6>
      <ul>${startingEquipmentHTML}</ul>
      <a href="${API_PREFIX}${data.url}" target="_blank">URL: ${data.url}</a>
    </article>
  `;

  return classHTML;
}
