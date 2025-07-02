// Beginner-friendly movie app using local arrays (no API needed)

// Movie data for each genre
const moviesByGenre = {
  "Comedy": [
    { title: "The Mask", rating: "7.0", year: "1994" },
    { title: "Superbad", rating: "7.6", year: "2007" },
    { title: "Dumb and Dumber", rating: "7.3", year: "1994" }
  ],
  "Action": [
    { title: "Die Hard", rating: "8.2", year: "1988" },
    { title: "Mad Max: Fury Road", rating: "8.1", year: "2015" },
    { title: "John Wick", rating: "7.4", year: "2014" }
  ],
  "Drama": [
    { title: "Forrest Gump", rating: "8.8", year: "1994" },
    { title: "The Shawshank Redemption", rating: "9.3", year: "1994" },
    { title: "The Godfather", rating: "9.2", year: "1972" }
  ],
  "Sci-Fi": [
    { title: "Inception", rating: "8.8", year: "2010" },
    { title: "The Matrix", rating: "8.7", year: "1999" },
    { title: "Interstellar", rating: "8.6", year: "2014" }
  ]
};

// Get DOM elements
const genreSelect = document.getElementById("genre");
const movieRecommendations = document.getElementById("movieRecommendations");

// Function to display movies for a genre
function displayMoviesByGenre(genreName) {
  // Get the movies array for the selected genre
  const movies = moviesByGenre[genreName];

  // If there are no movies, show a message
  if (!movies || movies.length === 0) {
    movieRecommendations.innerText = "No movies found for this genre.";
    return;
  }

  // Build a string with movie info
  let movieList = "";
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    movieList += `${movie.title} (⭐ ${movie.rating}, ${movie.year})\n`;
  }

  // Show the movies in the recommendations paragraph
  movieRecommendations.innerText = `Enjoy:\n${movieList}`;
}

// Listen for changes on the genre dropdown
genreSelect.addEventListener("change", function() {
  // Get the selected genre
  const selectedGenre = genreSelect.value;

  // Display movies for the selected genre
  displayMoviesByGenre(selectedGenre);
});

// On page load, show movies for the first genre
window.onload = function() {
  // Set default genre to Comedy
  genreSelect.value = "Comedy";
  displayMoviesByGenre("Comedy");
};
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];

    // Use poster image or a placeholder if not available
    const posterUrl = movie.poster_path
      ? `${IMG_BASE}${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image";

    // Create the card HTML
    const card = `
      <div class="movie-card">
        <img class="movie-poster" src="${posterUrl}" alt="${movie.title}">
        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <div class="movie-meta">
            <span class="movie-rating">⭐ ${movie.vote_average || "N/A"}</span>
            <span>${movie.release_date ? movie.release_date.slice(0,4) : "N/A"}</span>
          </div>
        </div>
      </div>
    `;

    // Add the card to the grid
    movieGrid.innerHTML += card;
  }


// Function to update the hero section with a movie
function updateHero(movie) {
  // Set the hero title and description
  heroTitle.textContent = movie.title;
  heroDescription.textContent = movie.overview || "No description available.";

  // Change the hero background image
  const heroBg = document.querySelector('.hero-bg');
  if (movie.backdrop_path) {
    heroBg.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;
  } else {
    heroBg.style.backgroundImage = `url('https://via.placeholder.com/1280x720?text=No+Image')`;
  }

  // Set the trailer button (for now, just alert)
  watchTrailerBtn.onclick = function() {
    alert(`Trailer for "${movie.title}" coming soon!`);
  };
}

// Listen for changes on the genre dropdown
genreSelect.addEventListener("change", function() {
  // Get the selected genre
  const selectedGenre = genreSelect.value;

  // Fetch and display movies for the selected genre
  fetchMoviesByGenre(selectedGenre);
});

// Navbar genre dropdown links (optional: allow clicking in navbar)
const navbarGenreDropdown = document.getElementById("navbarGenreDropdown");
if (navbarGenreDropdown) {
  const links = navbarGenreDropdown.querySelectorAll('a[data-genre]');
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event) {
      event.preventDefault();
      const genre = this.getAttribute('data-genre');
      genreSelect.value = genre;
      fetchMoviesByGenre(genre);
    });
  }
}

// On page load, show popular movies for the first genre
window.onload = function() {
  // Set default genre to Comedy
  genreSelect.value = "Comedy";
  fetchMoviesByGenre("Comedy");
};
