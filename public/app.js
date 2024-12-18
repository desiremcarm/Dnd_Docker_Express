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
});

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
    const itemEl = document.createElement('p');
    itemEl.innerHTML = `${element.name}`;

    resultContainer.appendChild(itemEl);
  });
}
