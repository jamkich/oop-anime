'use strict';
const seriesContainer = document.querySelector('.series');
const searchInput = document.querySelector('.inputAnime');
const searchButton = document.querySelector('.btn');
const sortSection = document.querySelector('.sort');
const select = document.querySelector('.select');

class Anime {
  constructor(name) {
    this._clearResults();
    this.name = name;
    this._fetchAnime();
  }

  async _fetchAnime() {
    try {
      const anime = await fetch(
        `https://api.jikan.moe/v3/search/anime?q=${this.name}`
      );
      const animeData = await anime.json();
      const animeResults = animeData.results;

      animeResults.forEach(e => {
        this._renderAnime(e);
      });

      seriesContainer.style.opacity = 1;
      sortSection.style.opacity = 1;
    } catch (err) {
      // alert(err);
    }
  }

  _renderAnime(data) {
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

  _clearResults() {
    seriesContainer.innerHTML = '';
    seriesContainer.style.opacity = 0;
    sortSection.style.opacity = 0;
  }
}

const addError = () => {
  searchInput.classList.add('shake');
  setTimeout(() => alert('Type correct name!'), 100);
};

const removeError = () => {
  searchInput.classList.remove('shake');
};

searchButton.addEventListener('click', e => {
  e.preventDefault();
  if (!searchInput.value || searchInput.value.length < 3) {
    addError();
  } else {
    new Anime(searchInput.value);
  }
  searchInput.value = '';
  searchInput.blur();
});

searchInput.addEventListener('change', removeError);

// objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))
select.addEventListener('change', e => {
  if (e.target.value == 'score') {
    console.log('XDDDDDD');
  }
});
