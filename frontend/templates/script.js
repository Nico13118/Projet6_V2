//script.js

// Affichage du meilleur film
document.addEventListener('DOMContentLoaded', () => {
    let movieNumber1Area = document.getElementById('movieNumber1Area');
    fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-usa_gross_income')
    //fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score,-votes')
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
                let cat = "0";
                let bestImage = "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/6116cc072824771992111acec7ba236e177d3e1975b87fa574dffb64f49a5b94._RI_TTW_SX720_FMjpg_.jpg";
                movieInfo.innerHTML = `
                    <div class="rectangle1">
                        <h1 class="page_title">Meilleur Film</h1>
                        <a href="javascript:void(0);">
                        <img class="single_image" src="${bestImage}" alt="${selectMovie.title}" onclick="showMovie('${urlSingleMovie}', '${cat}')">
                        </a>
                        <h2 class="movie_title">${selectMovie.title}</h2>
                        <p class="description">${movie.description}</p>
                        <a class="moreInformation" onclick="showMovie('${urlSingleMovie}', '${cat}')">Informations supplémentaires</a>
                        <a class="playMovie">Regarder le film</a>

                    </div>
                    `;
                    movieNumber1Area.appendChild(movieInfo);
            });
        });
});
// Fonction qui affiche le fenêtre modale contenant les informations d'un film
function showMovie(urlSingleMovie, cat) {
    let modal = document.getElementById("myModal");
    let overlay = document.querySelector(".overlay");
    modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
    centerModal(cat);

    fetch(urlSingleMovie)
    .then(response => response.json())
    .then( movie => {
        let infoRated = movie.rated;
        let infoUsaGrossIncome = movie.usa_gross_income;
        let infoWorldwildGrossIncome = movie.worldwide_gross_income;
        let typeOfClassification = "age";

        if ((infoRated <= 7) || infoRated === "G") {
            infoRated = "TOUS PUBLICS"
            typeOfClassification = "other";

        } else if (infoRated <= 10) {
            infoRated = "-10"

        } else if (infoRated <= 12) {
            infoRated = "-12"

        } else if ((infoRated <= 16) || infoRated === "PG") {
            infoRated = "-16"
            configureRankingIcon(typeOfClassification);

        } else if ((infoRated <= 18) || infoRated === "X" || infoRated === "R" || infoRated === "NC-17" || infoRated === "M") {
            infoRated = "-18"

        } else {
            infoRated = "CLASSIFICATION INCONNUE"
            typeOfClassification = "other";
        }

        if (!infoUsaGrossIncome) {
            infoUsaGrossIncome = "Information inconnue"
        } else {
            infoUsaGrossIncome = infoUsaGrossIncome + " $ US"
        }

        if (!infoWorldwildGrossIncome) {
            infoWorldwildGrossIncome = "Information inconnue"
        } else {
            infoWorldwildGrossIncome = infoWorldwildGrossIncome + " $ US"
        }


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

                    <div class="R5N1">
                        <div class="imdb_score">
                            <span>IMDb : ${movie.imdb_score}</span>
                        </div>
                        <div class="duration">
                            <span>Durée : ${movie.duration} min</span>
                        </div>
                        <div class="date_published">
                            <span>Date de sortie : ${movie.date_published}</span>
                        </div>
                        <div class="rectangle_rated">
                            <span class="rated">${infoRated}</span>
                        </div>
                    </div>

                    <div class="R5N2">
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
                            <span>Box office USA : ${infoUsaGrossIncome}</span>
                        </div>
                        <div class="worldwide_gross_income">
                            <span>Box office mondial : ${infoWorldwildGrossIncome}</span>
                        </div>
                    </div>
                </div>

            </div>
        `;
        modal.appendChild(movieInfo)
        configureRankingIcon(typeOfClassification);
    });
}

// Fonction qui ferme la fenêtre modale et supprime toutes les balises div
function closeBtn() {
    let modal = document.getElementById("myModal");
    let deleteDiv = modal.querySelectorAll("div");
    let overlay = document.querySelector(".overlay");
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    deleteDiv.forEach(div => {
        div.remove();

    });
}

// Catégorie 1 liste de films les mieux notés
document.addEventListener('DOMContentLoaded', () => {
    let moviesDetails1 = document.getElementById('moviesDetails1');
    let cat = "1";
    //let test = "http://127.0.0.1:8000/api/v1/titles/?page=" + info + "&sort_by=-imdb_score%2C-votes";
    //fetch('http://127.0.0.1:8000/api/v1/titles/?page=2&sort_by=-imdb_score%2C-votes')

    let nbrPages = [1, 2, 3];
    nbrPages.forEach(nbrPage => {
    let infoPage = "http://127.0.0.1:8000/api/v1/titles/?page=" + nbrPage + "&sort_by=-imdb_score%2C-votes";
    fetch(infoPage)
        .then(response => response.json())

        .then(data1 => {
            let movies1 = data1.results;  // La liste des films se trouve dans data1.results
            movies1.forEach(movie1 => {
                // Pour chaque film, un élément est créer pour affichez l'image'
                let movieInfo1 = document.createElement('div');
                movieInfo1.innerHTML = `
                    <a href="javascript:void(0);">
                    <img class="category1" src="${movie1.image_url}" alt="${movie1.title}" onclick="showMovie('${movie1.url}', '${cat}')">
                    </a>
                `;
                moviesDetails1.appendChild(movieInfo1);

            });
        });
    })
});

// Catégorie 2 Liste de films d'action
document.addEventListener('DOMContentLoaded', () => {
    let moviesDetails2 = document.getElementById('moviesDetails2');
    let cat = "2";

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
                    <img class="category2" src="${movie2.image_url}" alt="${movie2.title}" onclick="showMovie('${movie2.url}', '${cat}')">
                    </a>
                `;
                moviesDetails2.appendChild(movieInfo2)
            });
        });
});

// Catégorie 3 Liste de films Thriller
document.addEventListener('DOMContentLoaded', () => {
    let moviesDetails3 = document.getElementById('moviesDetails3');
    let cat = "3";
    fetch('http://127.0.0.1:8000/api/v1/titles/?genre_contains=Thriller&&sort_by=-year,-imdb_score')
        .then(response => response.json())

        .then(data3 => {
            let movies3 = data3.results;  // La liste des films se trouve dans data3.results
            movies3.forEach(movie3 => {
                // Pour chaque film, un élément est créer pour affichez l'image'
                let movieInfo3 = document.createElement('div');
                movieInfo3.innerHTML = `
                    <a href="javascript:void(0);">
                    <img class="category3" src="${movie3.image_url}" alt="${movie3.title}" onclick="showMovie('${movie3.url}', '${cat}')">
                    </a>
                `;
                moviesDetails3.appendChild(movieInfo3);
            });
        });
});


// Catégorie 4 Liste de films d'horreur
document.addEventListener('DOMContentLoaded', () => {
    let moviesDetails4 = document.getElementById('moviesDetails4');
    let cat = "4";
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
                    <img class="category4" src="${movie4.image_url}" alt="${movie4.title}" onclick="showMovie('${movie4.url}', '${cat}')">
                    </a>
                `;
                moviesDetails4.appendChild(movieInfo4)
            });
        });
});
const gap = 16;
//const width = 182;
const carousel = document.querySelector(".carousel"),
    moviesDetails1 = document.getElementById("moviesDetails1"),
    moviesDetails2 = document.getElementById("moviesDetails2"),
    moviesDetails3 = document.getElementById("moviesDetails3"),
    moviesDetails4 = document.getElementById("moviesDetails4"),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next');

next.addEventListener("click", e => {
    carousel.scrollBy(width + gap, 0);
    if (carousel.scrollWidth !== 0) {
        prev.style.display = "flex";
    }
    if (moviesDetails1.scrollWidth - width - gap <= carousel.scrollLeft + width) {
        next.style.display = "none";
    }
});

prev.addEventListener("click", e => {
   carousel.scrollBy(-(width + gap), 0);
   if (carousel.scrollLeft - width - gap <= 0) {
            prev.style.display = "none";
    }
    if (!moviesDetails1.scrollWidth - width - gap <= carousel.scrollLeft + width) {
        next.style.display = "flex";
    }
});

//let width = carousel.offsetWidth;
let width = moviesDetails1.offsetParent.children[0].offsetParent.offsetLeft;
window.addEventListener("resize", e => (width = moviesDetails1.offsetParent.children[0].offsetParent.offsetLeft));


// Fonction qui permet de placer la fenêtre modale selon le film selectionné
function centerModal(cat) {
    let modal = document.querySelector('.modal');
    console.log(cat)
    if (cat === "0") {
        console.log("La valeur de cat et 0");
        modal.style.top = '40%';
    } else if (cat === "1") {
        console.log("La valeur de cat et 1");
        modal.style.top = '130%';
    } else if (cat === "2") {
        console.log("La valeur de cat et 2");
        modal.style.top = '175%';
    } else if (cat === "3" || cat === "4") {
        console.log("La valeur de cat et 3 ou 4");
        modal.style.top = '200%';
    }
}

// Fonction qui permet de configurer le pictogramme des classements des films
function configureRankingIcon (typeOfClassification) {
    let rectangleRated = document.querySelector('.rectangle_rated');
    let rated = document.querySelector('.rated');
    if (typeOfClassification === "age") {
        rectangleRated.style.height = "33px";
        rectangleRated.style.width = "38px";
        rectangleRated.style.backgroundColor = "#000000";
        rectangleRated.style.padding = "1px";
        rectangleRated.style.marginTop = "-5px";
        rated.style.backgroundColor = "#FFFFFF";
        rated.style.borderRadius = "50%";
        rated.style.width = "33px";
        rated.style.height = "33px";
        rated.style.alignItems = "center";

    } else if (typeOfClassification === "other") {
        rectangleRated.style.backgroundColor = "#FFFFFF";
        rectangleRated.style.height = "25px";
        rectangleRated.style.width = "auto";
        rectangleRated.style.marginRight = "auto";
        rated.style.marginRight = "auto";
    }
}
