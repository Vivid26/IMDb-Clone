const apiBaseUrl = "https://api.themoviedb.org/3";
const apikey = "34386ec5358ca437ec6fd6b684886f4d";
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

const moviesGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const categoryTitle = document.getElementById("category-title");

const link = document.location.href;

async function fetchMoviesNowPlaying() {
    const response = await fetch(`${apiBaseUrl}/movie/now_playing?api_key=${apikey}`);
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    console.log(movies);
    displayMovies(movies);
}

function displayMovies(movies) {
    moviesGrid.innerHTML = movies.map(movie => 
				`<a target="_blank" href="./movie.html?movieName=${movie.title}">
                    <div class="movie-card">
	                    <img src="${imageBaseUrl}${movie.poster_path}"/>
	                    <p>⭐ ${movie.vote_average}</p>
	                    <h1>${movie.title}</h1>
	                </div>
                </a>`
    ).join("");
}

let searchMovies = async (query) => {
    const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apikey}&query="${query}"`);
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    displayMovies(movies);
    return movies;
}

function handleSearchFormSubmit(event) {
    categoryTitle.innerHTML = "Search Results";
    event.preventDefault();
    const searchQuery = searchInput.value;
    const movies = searchMovies(searchQuery);
    displayMovies(movies);
}

function showResults(val) {
    list = document.getElementById("result");
    list.innerHTML = '';
    
    if (val == '') {
        return;
    }
    searchMovies (val).then((data) => {
        //console.log(data);
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

searchForm.addEventListener("submit", handleSearchFormSubmit);
fetchMoviesNowPlaying();