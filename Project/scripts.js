// Fetching data
fetch("https://ghibli.rest/films")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response failed: " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    window.movies = data;
    displayCards(movies);
  })
  .catch((error) => {
    console.error("Problem with fetch operation:", error);
  });

// Function to display movie cards
function displayCards(movies) {
  const movieContainer = document.getElementById("movie-container");
  movieContainer.innerHTML = "";

  movies.forEach((movie) => {
    const card = `
      <div class="card">
        <div class="card-inner">
          <div class="card-front">
            <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
            <h4 class="card-title">${movie.title}</h4>
            <p>Director: ${movie.director}</p>
          </div>
          <div class="card-back">
            <h4 class="card-title">${movie.title}</h4>
            <p>Release Date: ${movie.release_date}</p>
            <p>${movie.description}</p>
          </div>
        </div>
      </div>`;
    movieContainer.innerHTML += card;
  });
}

// Sorting functions
//a-z
document.getElementById("sort-asc").addEventListener("click", function (e) {
  e.preventDefault();
  const sortedMovies = [...window.movies].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  displayCards(sortedMovies);
});
//z-a
document.getElementById("sort-desc").addEventListener("click", function (e) {
  e.preventDefault();
  const sortedMovies = [...window.movies].sort((a, b) =>
    b.title.localeCompare(a.title)
  );
  displayCards(sortedMovies);
});
//searchbar
document.getElementById("search-bar").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  const filteredMovies = window.movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchValue)
  );
  displayCards(filteredMovies);
});
//most recent release
document.getElementById("sort-recent").addEventListener("click", function (e) {
  e.preventDefault();
  const sortedMovies = [...window.movies].sort(
    (a, b) => new Date(b.release_date) - new Date(a.release_date)
  );
  displayCards(sortedMovies);
});
//oldest release
document.getElementById("sort-oldest").addEventListener("click", function (e) {
  e.preventDefault();
  const sortedMovies = [...window.movies].sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date)
  );
  displayCards(sortedMovies);
});
