window.addEventListener('DOMContentLoaded', () => {
  const classesBtn = document
    .getElementById('classesBtn')
    .addEventListener('click', async () => {
      try {
        await getAllClasses('/classes');
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    });
});

// GET ALL CLASSES
async function getAll(route) {
  const response = await fetch(route);
  const classes = await response.json();
  const data = classes.results;
  return data;
}
