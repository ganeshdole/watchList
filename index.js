const movieInput = document.getElementById("movie-input");
const searchBtn = document.getElementById("search-btn");
const apiKey = "65c98c14";
let moviesInfo = [];
let searchResult = [];

async function getMovieInfo() {
  moviesInfo = [];
  for (const movie of searchResult) {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
    );
    const data = await response.json();
    moviesInfo.push(data);
  }
  render();
}

searchBtn.addEventListener("click", async () => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieInput.value}`
  );
  const result = await response.json();
  searchResult = result.Search;
  getMovieInfo();
});

function renderMovies() {
  return moviesInfo
    .map((movie) => {
      const { imdbID, Poster, Title, Ratings, Runtime, Genre, Plot } = movie;
      return `
      <div class="movie" id="${imdbID}">
        <img class="movie-poster" src="${Poster}" alt="Movie Poster"/>
        <div class="movie-title">
            <h3 class="movie-title">${Title}</h3>
            <p class="movie-rating">${Ratings[0].Value.slice(0, 3)} ⭐️</p>
        </div>
        <p class="movie-runtime">${Runtime}</p>
        <p class="movie-genre">${Genre}</p>
        <div class="movie-wishlist">
            <img src="./images/add.png"/>
            <p>Watchlist</p>
        </div>
        <p class="movie-about">${Plot}</p>
    </div>`;
    })
    .join(" ");
}

function render() {
  document.getElementById("search-results").innerHTML = renderMovies();
}
