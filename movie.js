//Initial References
const movieNameRef = document.getElementById("movie-name");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");

const params = new URLSearchParams(document.location.search);
const movieName = params.get("movieName");
const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;


//*************To get Movie Card to display movie on movie page********************//
const movieCard = (data) => {
  return `
            <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                            ⭐  
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>           
        `;
}


//Function to fetch data from API
let getMovie = async () => {

  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response != "True") {
      //If movie does NOT exists in database
      result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
      throw new Error(`${data.Error}`);
    }
    //If movie exists in database
    result.innerHTML = movieCard(data);
  } catch (err) {
    //If error occurs
    console.error(err);
  };
};

window.addEventListener("load", getMovie);