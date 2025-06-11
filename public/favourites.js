const moviesGrid = document.getElementById("movies-grid");
const favouriteMoviesArray = [];


//*********  To insert favourite movie cards into DOM **********//
function displayMovieToFavourites(moviesArray) {
	moviesGrid.innerHTML = moviesArray.map(function (movie) {

        return `<div class="movie-card">
                    <a target="_blank" href="./movie.html?movieName=${movie.Title}">
	                    <img src="${movie.Poster}"/>
	                    <p>⭐ ${movie.imdbRating}</p>
	                    <h1>${movie.Title}</h1>
                    </a>
                    <button class="favourite-symbol" onclick="removeFromFavourites(this.parentNode.children[0].children[2].textContent)"> 🩷 </button>
                </div>`;
    }
    ).join("");    
}


//*********   Getting data from localStorage to display all favourite movies on the page.**********//
window.addEventListener("load", showFavouritesMovies);

function showFavouritesMovies() {
	if (window.localStorage.length > 0) {
		for (let i = 0; i < window.localStorage.length; i++) {
			const keyName = window.localStorage.key(i);
			const favMovie = JSON.parse(window.localStorage.getItem(keyName));
			favouriteMoviesArray.push(favMovie);
		}

		displayMovieToFavourites(favouriteMoviesArray);
	} else {
		moviesGrid.innerHTML =`<h1> Ooops! You don't have favourites. </h1>`;
	}
}



// ************* Remove from Favourite Movies Collection **********************//
const removeFromFavourites = (movie) => { 
	window.localStorage.removeItem(movie.toLowerCase().trim());
	window.location.reload();
};
