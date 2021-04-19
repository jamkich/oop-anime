'use strict';
const seriesContainer = document.querySelector('.series');

/* <div class="anime">
<img class="anime__img" src="${data.image_url}" />
<div class="anime__data">
  <h3 class="anime__name">${data.title}</h3>
  <h4 class="anime__score">score: ${data.score}</h4>
  <p class="anime__row"><span> type: </span>${data.type}</p>
  <p class="anime__row"><span>episodes: </span>${data.episodes}</p>
</div>
</div> */

const renderAnime = data => {
  const html = `
  <div class="anime" style="background-image: url(${data.image_url})">
    <div class="anime__data">
      <h3 class="anime__name">${data.title}</h3>
      <h4 class="anime__score">score: ${data.score}</h4>
      <p class="anime__row"><span> type: </span>${data.type}</p>
      <p class="anime__row"><span>episodes: </span>${data.episodes}</p>
    </div>
  </div>
  `;

  seriesContainer.insertAdjacentHTML('beforeend', html);
  // html.style.backgroundImage = `url(${data.image_url})`;
  console.log();
};

const searchAnime = async function (animeName) {
  try {
    const anime = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${animeName}`
    );
    const animeData = await anime.json();
    const animeResults = animeData.results;

    animeResults.forEach(e => {
      renderAnime(e);
    });
  } catch (err) {
    console.error(err);
  }
};

searchAnime('naruto');
