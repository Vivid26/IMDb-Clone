// TMDB API base url, api-key and image base url declaration
const apiBaseUrl = "https://api.themoviedb.org/3";
const apikey = "34386ec5358ca437ec6fd6b684886f4d";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

// DOM elements references
const moviesGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const categoryTitle = document.getElementById("category-title");




//*********  To insert movie cards into DOM **********//
function displayMovies(movies) {
    moviesGrid.innerHTML = movies.map(function (movie) {
        const favouriteBtn = getfavouriteBtn(movie.title);
        return `<div class="movie-card">
                    <a target="_blank" href="./movie.html?movieName=${movie.title}">
	                    <img src="${imageBaseUrl}${movie.poster_path}"/>
	                    <p>⭐ ${movie.vote_average}</p>
	                    <h1>${movie.title}</h1>
                    </a>
                    ${favouriteBtn}
                </div>`;
    }
    ).join("");
}

//*********  API call to get movielist for respective search by user  **********//
let searchMovies = async (query) => {
    const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apikey}&query="${query}"`);
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    categoryTitle.innerHTML = "Search Results";
    displayMovies(movies);
    return movies;
}

//**********  Search With Submit Event at search bar  ***************//
function handleSearchFormSubmit(event) {
    categoryTitle.innerHTML = "Search Results";
    event.preventDefault();
    const searchQuery = searchInput.value;
    const movies = searchMovies(searchQuery);
    displayMovies(movies);
}

searchForm.addEventListener("submit", handleSearchFormSubmit);


//*********  To display datalist auto suggestions for typed name of movie in search bar  **********//
function showResults(val) {
    list = document.getElementById("result");
    list.innerHTML = '';
    
    if (val == '') {
        return;
    }
    searchMovies (val).then((data) => {
        for (i = 0; i < data.length; i++) {
            const newOption = document.createElement("option");
            newOption.textContent = data[i].title;
            list.appendChild(newOption);
        }

        return true;
    }).catch(function (err) {
       console.warn('Something went wrong.', err);
       return false;
    });
}


//********* To Show Now Playing Movies on the Home Page of Website **********//
async function fetchMoviesNowPlaying() {
    const response = await fetch(`${apiBaseUrl}/movie/now_playing?api_key=${apikey}`); //Get a list of movies that are currently in theatres.
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    categoryTitle.innerHTML = "Now Playing Movies";
    displayMovies(movies);
}

fetchMoviesNowPlaying();





// Functionality for Favourite Movies//

// ************* Get Add/Remove Favourite button while movie card insertion into DOM **********************//
const getfavouriteBtn = (movieName) =>{
    if(Object.keys(window.localStorage).includes(movieName.toLowerCase().trim())){
        return `<button class="favourite-symbol" onclick="removeFromFavourites(this.parentNode.children[0].children[2].textContent)"> 🩷 </button>`;
    }else {
        return `<button class="favourite-symbol" onclick="addToFavourites(this.parentNode.children[0].children[2].textContent)"> 🤍 </button>`;
    }
}


// ************* API call to get a movie details to add in Favourite Movies Collection**********************//
let getFavouriteMovie = async (movieName) => {
	let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const movies = jsonResponse;
    return movies;
}


// ************* Add a movie to Favourite Movies Collection**********************//

const addToFavourites = function (movieName) {
	if (movieName == '') {
        return;
    }
    getFavouriteMovie (movieName).then((data) => {
        console.log(data);
		const movie = data;
		if(movie.Title.toLowerCase().trim() === movieName.toLowerCase().trim()){
			window.localStorage.setItem(movieName.toLowerCase().trim(),JSON.stringify(movie)); //used localStorage to save favourites data
			window.location.reload();
            //this.document.activeElement.innerHTML = " 🩷 ";
            //this.document.activeElement.onclick = "removeFromFavourites(this.parentNode.children[0].children[2].textContent)";
		}
        return true;
    }).catch(function (err) {
       console.warn('Something went wrong.', err);
       return false;
     });
};


// ************* Remove from Favourite Movies Collection **********************//
const removeFromFavourites = (movie) => { 
	window.localStorage.removeItem(movie.toLowerCase().trim());
	window.location.reload();
};

