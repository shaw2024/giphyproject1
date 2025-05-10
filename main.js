const API_KEY = 'AeTvbQ55cypN0hrAuewJZUlf0VOUNwnY'; // Replace with your actual Giphy API key

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const results = document.getElementById('results');
const loader = document.getElementById('loader');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  results.innerHTML = '';
  loader.classList.remove('hidden');

  try {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(query)}&limit=12&rating=G`
    );
    const data = await res.json();

    if (data.data.length === 0) {
      results.innerHTML = '<p>No GIFs found.</p>';
    } else {
      data.data.forEach((gif) => {
        const gifDiv = document.createElement('div');
        gifDiv.classList.add('gif-item');

        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;

        gifDiv.appendChild(img);
        results.appendChild(gifDiv);
      });
    }
  } catch (err) {
    results.innerHTML = '<p>Error loading GIFs.</p>';
    console.error(err);
  } finally {
    loader.classList.add('hidden');
  }
});
