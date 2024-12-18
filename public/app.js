window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('classesBtn').addEventListener('click', async () => {
    try {
      await getAll('/classes');
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  });

  document.getElementById('spellsBtn').addEventListener('click', async () => {
    try {
      await getAll('/spells');
    } catch (error) {
      console.error('Error fetching spells:', error);
    }
  });

  document.getElementById('spellsBtn').addEventListener('click', async () => {
    try {
      await getAll('/monsters');
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
