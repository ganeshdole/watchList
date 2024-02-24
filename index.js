const movieInput = document.getElementById("movie-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  fetch(`http://www.omdbapi.com/?apikey=65c98c14&s=${movieInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("search-results").innerHTML = data.Search.map(
        (movie) => {
          return `<div class="movie>
               <h3>${movie.Title}</h3>
          </div>
          `;
        }
      ).join(" ");
      console.log(data);
    });
});
