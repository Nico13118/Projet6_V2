//script.js
const gap = 20;
let scrollNextPrev = 0;
let scrollNextPrev1 = 0;
let scrollNextPrev2 = 0;
let scrollNextPrev3 = 0;
let scrollNextPrev4 = 0;
showBestMovie();

 //Affichage du meilleur film
function showBestMovie() {
    document.addEventListener('DOMContentLoaded', () => {
        let movieNumber1Area = document.getElementById('movieNumber1Area');
            cat = "0";
            bestImage = "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/6116cc072824771992111acec7ba236e177d3e1975b87fa574dffb64f49a5b94._RI_TTW_SX720_FMjpg_.jpg";
        fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score,-votes')
        .then(response => response.json())
        .then(movies => {
            let bestMovieData = movies.results; // Ma liste de film selectionné se trouve dans le champ "results"
            // Selection du meilleur film
                selectMovie = bestMovieData[0];
            // Selection de l'URL du film
                urlSingleMovie = selectMovie.url;
        fetch(urlSingleMovie)
            .then(response => response.json())
            .then(movie => {
                let movieInfo = document.createElement('div');
                // Ajout des informations d'un film dans chaque balise
                movieInfo.innerHTML = `
                    <div class="rectangle1">
                        <h1 class="page_title">Meilleur Film</h1>
                        <a href="javascript:void(0);">
                        <img class="single_image" src="${bestImage}" alt="${movie.title}" onclick="showMovie('${urlSingleMovie}', '${cat}')">
                        </a>
                        <h2 class="movie_title">${movie.title}</h2>
                        <p class="description">${movie.description}</p>
                        <a class="moreInformation" onclick="showMovie('${urlSingleMovie}', '${cat}')">Informations supplémentaires</a>
                        <a class="playMovie">Regarder le film</a>

                    </div>
                `;
                movieNumber1Area.appendChild(movieInfo)
                showMovieAllCategory();

            });
        });
    });
}

// Fonction qui affiche le fenêtre modale contenant les informations d'un film
function showMovie(urlSingleMovie, cat) {
    let modal = document.getElementById("myModal");
        overlay = document.querySelector(".overlay");
    modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
    centerModal(cat);

    fetch(urlSingleMovie)
    .then(response => response.json())
    .then( movie => {
        let infoRated = movie.rated;
            infoUsaGrossIncome = movie.usa_gross_income;
            infoWorldwildGrossIncome = movie.worldwide_gross_income;
            typeOfClassification = "age";

        if ((infoRated <= 7) || infoRated === "G") {
            infoRated = "TOUS PUBLICS"
            typeOfClassification = "other";

        } else if (infoRated <= 10) {
            infoRated = "-10"

        } else if (infoRated <= 12) {
            infoRated = "-12"

        } else if ((infoRated <= 16) || infoRated === "PG" || infoRated === "R") {
            infoRated = "-16"

        } else if ((infoRated <= 18) || infoRated === "X"  || infoRated === "NC-17" || infoRated === "M") {
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

                    <div class="R8">
                        <div class="container_playerMovie2">
                            <a class="playMovie2">Regarder le film</a>
                        </div>
                        <div class="container_addFavorites">
                            <a class="addFavorites">Ajouter aux favoris</a>
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
        deleteDiv = modal.querySelectorAll("div");
        overlay = document.querySelector(".overlay");
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    deleteDiv.forEach(div => {
        div.remove();

    });
}

// Fonction qui permet de selectionner l'url selon la catégorie demandée
// Romance, Biography, Crime, Drama, History, Adventure, Fantasy, War, Mystery, Horror, Western, Comedy, Family
// Action, Sci-Fi, Thriller, Sport, Animation, Musical, Music, Film-Noir, Adult, Documentary, Reality-TV, News
function selectUrl(cat, nbrPage) {
    let urlPage = "";
    let categoryName = "";
    const listCategory = ["War", "Adventure", "Horror"];
    if (cat === "1") {
        urlPage = "http://127.0.0.1:8000/api/v1/titles/?page=" + nbrPage + "&sort_by=-imdb_score%2C-votes";
        return urlPage;
    } else {
        if (cat === "2") {
            categoryName = listCategory[0];
    }
        if (cat === "3") {
            categoryName = listCategory[1];
    }
        if (cat === "4") {
            categoryName = listCategory[2];
    }
    urlPage = "http://127.0.0.1:8000/api/v1/titles/?genre_contains=" + categoryName + "&page=" + nbrPage + "&sort_by=-year";
    return urlPage;
    }
}

// Fonction qui gère la requête fetch pour les 4 catégories
async function getFetch(urlPage) {
    try {
        let response = await fetch(urlPage);
        if (!response.ok) {
            throw new Error('Erreur')
        }
        let data = await response.json();
        let movies = data.results;
        return movies;
    } catch (error) {
        console.error('Erreur requête fetch :', error);
        return null;
    }
}

// Fonction qui gère l'affichage des 4 catégories
async function showMovieAllCategory() {
    let i = 1;

    const nbrPages = [1, 2, 3];
    while (i <= 4) {
        let cat = i.toString();
            idMoviesDetails = 'moviesDetails' + cat;
            classCarousel = '.carousel' + cat;
            classtNext = '.next' + cat;
            classPrev = '.prev' + cat;
            classPageTitle = '.page_title' + cat;
            classCategory = '.category' + cat;
            selectIdMoviesDetails = document.getElementById(idMoviesDetails);
            selectNext = document.querySelector(classtNext);
            selectPrev = document.querySelector(classPrev);
            selectPageTitle = document.querySelector(classPageTitle);
            movieCounter = 0;
            nbrMovies = 0;

        selectPrev.style.display = 'flex'; // Permet d'activer l'affichage du bouton prev
        selectNext.style.display = 'flex'; // Permet d'activer l'affichage du bouton next
        selectPageTitle.style.display = 'flex'; // Permet d'afficher le titre de la catégorie

        for (let nbrPage of nbrPages) {
            let urlPage = selectUrl(cat, nbrPage);
            let movies = await getFetch(urlPage);

            movies.forEach(movie => {
                movieCounter++;
                let movieInfo = document.createElement('div');
                movieInfo.innerHTML = `
                    <a href="javascript:void(0);">
                    <img class="${classCategory}" src="${movie.image_url}" alt="${movie.title}" onclick="showMovie('${movie.url}', '${cat}')" style="width: 230px";>
                    </a>
                `;
                selectIdMoviesDetails.appendChild(movieInfo);
                nbrMovies = movies.length * nbrPages.length
                if (movieCounter === nbrMovies) {
                    i++;
                }
            });
        }
    }
    let scrollNextPrev = selectIdMoviesDetails.clientWidth; // Variable global
        scrollNextPrev1 = scrollNextPrev; // Variable global
        scrollNextPrev2 = scrollNextPrev; // Variable global
        scrollNextPrev3 = scrollNextPrev; // Variable global
        scrollNextPrev4 = scrollNextPrev; // Variable global
}

function getNextPrev(classNextPrev, moviesDetails, classCarousel) {
    let selectIdMoviesDetails = document.getElementById(moviesDetails);
        selectLengthCarousel = selectIdMoviesDetails.clientWidth;
        selectCarousel = document.querySelector(classCarousel);
        selectNextPrev = document.querySelector(classNextPrev);
        next = selectNextPrev.classList[0];
        prev = selectNextPrev.classList[0];
        totalCarousel = selectCarousel.scrollWidth + gap;
        infoscrollNextPrev = 0;
    if (next === 'next1' || next === 'next2' || next === 'next3' || next === 'next4') {
        let width = selectIdMoviesDetails.children[0].clientWidth + gap;
            selectNext = selectNextPrev;
            selectCarousel.scrollBy(width, 0);
        if (next === 'next1') {
            if (scrollNextPrev1 < totalCarousel) {
                scrollNextPrev1 += width;
                infoscrollNextPrev = scrollNextPrev1;
            }
        }
        if (next === 'next2') {
            if (scrollNextPrev2 < totalCarousel) {
                scrollNextPrev2 += width;
                infoscrollNextPrev = scrollNextPrev2;
            }
        }
        if (next === 'next3') {
            if (scrollNextPrev3 < totalCarousel) {
                scrollNextPrev3 += width;
                infoscrollNextPrev = scrollNextPrev3;
            }
        }
        if (next === 'next4') {
            if (scrollNextPrev4 < totalCarousel) {
                scrollNextPrev4 += width;
                infoscrollNextPrev = scrollNextPrev4;
            }
        }
    }

    if (prev === 'prev1' || prev === 'prev2' || prev === 'prev3' || prev === 'prev4') {
        let width = selectIdMoviesDetails.children[0].clientWidth + gap;
            selectPrev = selectNextPrev;
            selectCarousel.scrollBy(-width, 0);
        if (prev === 'prev1') {
            if (scrollNextPrev1 > selectLengthCarousel) {
                scrollNextPrev1 -= width;
                infoscrollNextPrev = scrollNextPrev1;
            }
        }
        if (prev === 'prev2') {
            if (scrollNextPrev2 > selectLengthCarousel) {
                scrollNextPrev2 -= width;
                infoscrollNextPrev = scrollNextPrev2;
            }
        }
        if (prev === 'prev3') {
            if (scrollNextPrev3 > selectLengthCarousel) {
                scrollNextPrev3 -= width;
                infoscrollNextPrev = scrollNextPrev3;
            }
        }
        if (prev === 'prev4') {
            if (scrollNextPrev4 > selectLengthCarousel) {
                scrollNextPrev4 -= width;
                infoscrollNextPrev = scrollNextPrev4;
            }
        }
    }
}

// Fonction qui permet de placer la fenêtre modale selon la catégorie du film selectionné
function centerModal(cat) {
    let modal = document.querySelector('.modal');
    modal.style.top = "";
    modal.style.bottom = "";
    if (cat === "0") {
        modal.style.top = '40%';
    } else if (cat === "1") {
        modal.style.top = '130%';
    } else if (cat === "2") {
        modal.style.top = '160%';
    } else if (cat === "3" || cat === "4") {
        modal.style.bottom = '-180%';
    }
}

// Fonction qui permet de configurer le pictogramme des classements de films
function configureRankingIcon (typeOfClassification) {
    let rectangleRated = document.querySelector('.rectangle_rated');
        rated = document.querySelector('.rated');
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


