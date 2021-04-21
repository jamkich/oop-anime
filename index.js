'use strict';
const seriesContainer = document.querySelector('.series');
const searchInput = document.querySelector('.inputAnime');
const searchButton = document.querySelector('.btn');
class Anime {
  constructor(name) {
    this.name = name;
  }

  async searchAnime() {
    try {
      const anime = await fetch(
        `https://api.jikan.moe/v3/search/anime?q=${this.name}`
      );
      const animeData = await anime.json();
      const animeResults = animeData.results;

      animeResults.forEach(e => {
        this.renderAnime(e);
      });

      seriesContainer.style.opacity = 1;
    } catch (err) {
      console.error(err);
    }
  }

  renderAnime(data) {
    const html = `
    <div class="anime">
      <div class="anime__data">
        <img class="anime__img" src="${data.image_url}" />
        <h3 class="anime__name">${data.title}</h3>
        <h4 class="anime__score">score: ${data.score}</h4>
        <p class="anime__row "><span> type: </span>${data.type}</p>
        <p class="anime__row "><span>episodes: </span>${data.episodes}</p>
      </div>
    </div>
    `;

    seriesContainer.insertAdjacentHTML('beforeend', html);
  }

  deleteAnime() {
    seriesContainer.style.opacity = '0';
  }
}

let a;
searchButton.addEventListener('click', e => {
  seriesContainer.style.opacity = '0';
  e.preventDefault();
  a = new Anime(searchInput.value);
  a.searchAnime();
  searchInput.value = '';
});
