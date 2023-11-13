//script.js

document.addEventListener('DOMContentLoaded', () => {
    let movieNumber1Area = document.getElementById('movieNumber1Area');
    fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score,-votes')
        .then(response => response.json())
        .then(movies => {
            let bestMovieData = movies.results; // Ma liste de film selectionné se trouve dans le champ "results"
            // Selection du meilleur film
            let selectMovie = bestMovieData[0];
            // Selection de l'id du film
            let idSelect = selectMovie.id;
            let urlSingleMovie = selectMovie.url;
        fetch(urlSingleMovie)
            .then(response => response.json())
            .then(movie => {
                let movieInfo = document.createElement('div');
                // Ajout des informations d'un film dans chaque balise
                let bestImage = "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/6116cc072824771992111acec7ba236e177d3e1975b87fa574dffb64f49a5b94._RI_TTW_SX720_FMjpg_.jpg";
                movieInfo.innerHTML = `
                    <div class="rectangle1">
                        <h1 class="page_title">Meilleur Film</h1>
                        <a href="javascript:void(0);">
                        <img class="single_image" src="${bestImage}" alt="${selectMovie.title}" onclick="showMovie('${urlSingleMovie}')">
                        </a>
                        <h2 class="movie_title">${selectMovie.title}</h2>
                        <p class="description">${movie.description}</p>
                        <a class="moreInformation" onclick="showMovie('${urlSingleMovie}')">Informations supplémentaires</a>
                        <a class="playMovie">Regarder le film</a>
                        <div id="myModal" class="modal"></div>
                    </div>
                    `;
                    movieNumber1Area.appendChild(movieInfo);
            });
        });
});

function showMovie(urlSingleMovie) {
    let modal = document.getElementById("myModal");

    fetch(urlSingleMovie)
    .then(response => response.json())
    .then( movie => {
        let movieInfo = document.createElement('div');
            movieInfo.innerHTML = `
            <div class="container1">

                <div class="R1">
                    <img class="single_image2" src="${movie.image_url}" alt="${movie.title}">
                </div>

                <div class="R2">
                    <div class="modal-content R3">
                        <span class="close" id="closeModal" onclick="closeBtn()">&times;</span>
                    </div>

                    <div class="R4">
                        <h1 class="movie_title2">${movie.original_title}</h1>
                        <p class="description2">${movie.long_description}</p>
                    </div>

                    <div class="R5">
                        <div class="imdb_score">
                            <span>IMDb : ${movie.imdb_score}</span>
                        </div>
                        <div class="duration">
                            <span>Durée : ${movie.duration}</span>
                        </div>
                        <div class="date_published">
                            <span>Date de sortie : ${movie.date_published}</span>
                        </div>
                        <div class="rated">
                            <span>Notation du contenu : ${movie.rated}</span>
                        </div>
                        <div class="genres">
                            <span>Genres : ${movie.genres}</span>
                        </div>
                    </div>

                    <div class="R6">
                        <div class="directors">
                            <span>Réalisateur : ${movie.directors}</span>
                        </div>
                        <div class="actors">
                            <span>Liste des acteurs : ${movie.actors}</span>
                        </div>
                    </div>

                    <div class="R7">
                        <div class="countries">
                            <span>Pays : ${movie.countries}</span>
                        </div>
                        <div class="usa_gross_income">
                            <span>Box office USA : ${movie.usa_gross_income}</span>
                        </div>
                        <div class="worldwide_gross_income">
                            <span>Box office mondial : ${movie.worldwide_gross_income}</span>
                        </div>
                    </div>
                </div>

            </div>
        `;
        modal.appendChild(movieInfo)
    });

}

function closeBtn() {
  let modal = document.getElementById("myModal");
    let deleteDiv = modal.querySelectorAll("div")
    deleteDiv.forEach(div => {
        div.remove();

    });
}

// Catégorie 1 liste de films les mieux notés
document.addEventListener('DOMContentLoaded', () => {
    let moviesDetails1 = document.getElementById('moviesDetails1');

    fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score,-votes')
        .then(response => response.json())

        .then(data1 => {
            let movies1 = data1.results;  // La liste des films se trouve dans data1.results
            movies1.forEach(movie1 => {
                // Pour chaque film, un élément est créer pour affichez l'image'
                let movieInfo1 = document.createElement('div');
                movieInfo1.innerHTML = `
                    <a href="javascript:void(0);">
                    <img class="category1" src="${movie1.image_url}" alt="${movie1.title}" onclick="showMovie('${movie1.url}')">
                    </a>
                `;
                moviesDetails1.appendChild(movieInfo1);
            });
        });
});

// Catégorie 2 Liste de films d'action
document.addEventListener('DOMContentLoaded', () => {
    let moviesDetails2 = document.getElementById('moviesDetails2');

    fetch('http://127.0.0.1:8000/api/v1/titles/?genre_contains=Action&sort_by=-year%2C-imdb_score')
        .then(response => response.json())
        .then(data2 => {
            let movies2 = data2.results;
            let nextpage = data2.next;
            let previousPage = data2.previous;
            movies2.forEach(movie2 => {
                let movieInfo2 = document.createElement('div');
                movieInfo2.innerHTML = `
                    <a href="javascript:void(0);">
                    <img class="category2" src="${movie2.image_url}" alt="${movie2.title}" onclick="showMovie('${movie2.url}')">
                    </a>
                `;
                moviesDetails2.appendChild(movieInfo2)
            });
        });
});

// Catégorie 3 Liste de films Thriller
document.addEventListener('DOMContentLoaded', () => {
    let moviesDetails3 = document.getElementById('moviesDetails3');

    fetch('http://127.0.0.1:8000/api/v1/titles/?genre_contains=Thriller&&sort_by=-year,-imdb_score')
        .then(response => response.json())

        .then(data3 => {
            let movies3 = data3.results;  // La liste des films se trouve dans data3.results
            movies3.forEach(movie3 => {
                // Pour chaque film, un élément est créer pour affichez l'image'
                let movieInfo3 = document.createElement('div');
                movieInfo3.innerHTML = `
                    <a href="javascript:void(0);">
                    <img class="category3" src="${movie3.image_url}" alt="${movie3.title}" onclick="showMovie('${movie3.url}')">
                    </a>
                `;
                moviesDetails3.appendChild(movieInfo3);
            });
        });
});


// Catégorie 4 Liste de films d'horreur
document.addEventListener('DOMContentLoaded', () => {
    let moviesDetails4 = document.getElementById('moviesDetails4');

    fetch('http://127.0.0.1:8000/api/v1/titles/?genre_contains=Horror&sort_by=-year%2C-imdb_score')
        .then(response => response.json())
        .then(data4 => {
            let movies4 = data4.results;
            let nextpage = data4.next;
            let previousPage = data4.previous;
            movies4.forEach(movie4 => {
                let movieInfo4 = document.createElement('div');
                movieInfo4.innerHTML = `
                    <a href="javascript:void(0);">
                    <img class="category4" src="${movie4.image_url}" alt="${movie4.title}" onclick="showMovie('${movie4.url}')">
                    </a>
                `;
                moviesDetails4.appendChild(movieInfo4)
            });
        });
});


let buttonAreaLeft = document.getElementById('buttonAreaLeft');
buttonAreaLeft.addEventListener("click", function () {
    console.log("Boutton gauche")
});

let buttonAreaRight = document.getElementById('buttonAreaRight');
buttonAreaRight.addEventListener("click", function () {
    console.log("Boutton droit")
});
