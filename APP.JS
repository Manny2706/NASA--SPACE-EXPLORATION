const API_KEY = 'DT4VQSXJDnjqNVNBJTwPQhdg7PUUqRt4aXQltaMM';
const baseURL = 'https://api.nasa.gov/planetary/apod';

const img = document.getElementById('apod-img');
const title = document.getElementById('title');
const desc = document.getElementById('description');
const loader = document.getElementById('loader');


const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentDate = new Date();
console.log(currentDate)
function formatDate(date) {
    console.log( date.toISOString().split('T')[0]);
  return date.toISOString().split('T')[0];
}

async function fetchAPOD(date) {
  loader.classList.remove('hidden');
 
  img.classList.add('hidden');
 
  title.classList.add('hidden');
  desc.classList.add('hidden');

  const url = `${baseURL}?api_key=${API_KEY}&date=${formatDate(date)}`;
console.log(url)
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    const data = await res.json();
   console.log(data)
    title.textContent = data.title;
    desc.textContent = data.explanation;

    if (data.media_type === 'image') {
      img.src = data.url;
    img.classList.remove('hidden');
     
    } 

 title.classList.remove('hidden');
 title.classList.remove('title-error');
desc.classList.remove('hidden');
  } catch (err) {
    console.error(err);
title.textContent = "Oops! Couldn't load the image. Try again.";
    title.classList.remove('hidden');
    title.classList.add('title-error');
  } finally {
    loader.classList.add('hidden');
  }
}

prevBtn.addEventListener('click', () => {
  currentDate.setDate(currentDate.getDate() - 1);
  fetchAPOD(currentDate);
});

nextBtn.addEventListener('click', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (currentDate < new Date()) {
    currentDate.setDate(currentDate.getDate() + 1);
    fetchAPOD(currentDate);
  }
});

fetchAPOD(currentDate);
