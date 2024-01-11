const moviesGrid = document.getElementById("movies-grid");

function addMovieToFavourites(movie) {
    moviesGrid.innerHTML =
				`<div class="movie-card">
	            <img src="${imageBaseUrl}${movie.poster_path}"/>
	            <p>⭐ ${movie.vote_average}</p>
	            <h1>${movie.title}</h1>
	        </div>`
}