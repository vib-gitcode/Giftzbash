// Simulated fetch and save using localStorage fallback
async ;function loadJSON(filename) {
  const data = localStorage.getItem(filename);
  return data ? JSON.parse(data) : null;
}

async function saveJSON(filename, data) {
  localStorage.setItem(filename, JSON.stringify(data, null, 2));
}
