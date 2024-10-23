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
                        <h5 class="card-title">${movie.title}</h5>
                    </div>
                    <div class="card-back">
                        <p>${movie.description}</p>
                    </div>
                </div>
            </div>`;
    movieContainer.innerHTML += card;
  });
}

// Sorting functionality
document.getElementById("sort-asc").addEventListener("click", function (e) {
  e.preventDefault();
  const sortedMovies = [...window.movies].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  displayCards(sortedMovies);
});

document.getElementById("sort-desc").addEventListener("click", function (e) {
  e.preventDefault();
  const sortedMovies = [...window.movies].sort((a, b) =>
    b.title.localeCompare(a.title)
  );
  displayCards(sortedMovies);
});
