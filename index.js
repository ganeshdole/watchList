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
      return `
    <div class="movie">
        <img class="movie-poster" src="${movie.Poster}"/>
        <h1>${movie.Title}</h1>
        <p>${movie.Ratings[0].Value.slice(0, 3)}⭐️</p>
        <p>${movie.Runtime}</p>
        <p>${movie.Genre}</p>
        <p>${movie.Plot}</p>
    </div>
    `;
    })
    .join(" ");
}

function render() {
  document.getElementById("search-results").innerHTML = renderMovies();
}
