//script.js
const gap = 20;
showBestMovie();

// Affichage du meilleur film
function showBestMovie () {
    document.addEventListener('DOMContentLoaded', () => {
        let movieNumber1Area = document.getElementById('movieNumber1Area');
        fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score,-votes')
        .then(response => response.json())
        .then(movies => {
            let bestMovieData = movies.results; // Ma liste de film selectionné se trouve dans le champ "results"
            // Selection du meilleur film
            let selectMovie = bestMovieData[0];
            // Selection de l'id du film
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
                        <img class="single_image" src="${bestImage}" alt="${movie.title}" onclick="showMovie('${urlSingleMovie}', '${cat}')">
                        </a>
                        <h2 class="movie_title">${movie.title}</h2>
                        <p class="description">${movie.description}</p>
                        <a class="moreInformation" onclick="showMovie('${urlSingleMovie}', '${cat}')">Informations supplémentaires</a>
                        <a class="playMovie">Regarder le film</a>

                    </div>
                `;
                movieNumber1Area.appendChild(movieInfo)
                showMovieCategory1();
            });
        });
    });
}

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
function showMovieCategory1 () {
    let moviesDetails1 = document.getElementById('moviesDetails1'),
        cat = "1",
        lengthCarousel = moviesDetails1.clientWidth,
        carousel1 = document.querySelector(".carousel1"),
        scrollNextPrev1 = moviesDetails1.clientWidth,
        next1 = document.querySelector('.next1'),
        prev1 = document.querySelector('.prev1'),
        movieCounter1 = 0; // Compteur de film
        nbrMovies1 = 0; // // Nombre total de film
        nbrPages1 = [1, 2, 3];
    prev1.style.display = "flex";
    next1.style.display = "flex";
    nbrPages1.forEach(nbrPage1 => {
    let infoPage1 = "http://127.0.0.1:8000/api/v1/titles/?page=" + nbrPage1 + "&sort_by=-imdb_score%2C-votes";
    fetch(infoPage1)
        .then(response => response.json())

        .then(data1 => {
            let movies1 = data1.results;  // La liste des films se trouve dans data1.results
            movies1.forEach(movie1 => {
                movieCounter1 += 1
                // Pour chaque film, un élément est créer pour affichez l'image'
                let movieInfo1 = document.createElement('div');
                movieInfo1.innerHTML = `
                    <a href="javascript:void(0);">
                    <img class="category1" src="${movie1.image_url}" alt="${movie1.title}" onclick="showMovie('${movie1.url}', '${cat}')">
                    </a>
                `;
                moviesDetails1.appendChild(movieInfo1);
                nbrMovies1 = movies1.length * nbrPages1.length;
                if (movieCounter1 === nbrMovies1) {
                    showMovieCategory2();
                }
            });
        });

    });

next1.addEventListener("click", e => {
    let width = moviesDetails1.children[0].clientWidth + gap;
    carousel1.scrollBy(width, 0);
    scrollNextPrev1 += width
    console.log("Info scrollNextPrev1", scrollNextPrev1)
    if (scrollNextPrev1 !== 0) {
        prev1.style.display = "flex";
    }
    if (scrollNextPrev1 >= carousel1.scrollWidth) {
        next1.style.display = "none";
    }
});

prev1.addEventListener("click", e => {
    let width = moviesDetails1.children[0].clientWidth + gap;
    carousel1.scrollBy(-width, 0);
    scrollNextPrev1 -= width
    if (scrollNextPrev1 <= lengthCarousel) {
        prev1.style.display = "none";
    }
    if (scrollNextPrev1 < carousel1.scrollWidth) {
        next1.style.display = "flex";
    }
});
}



// Catégorie 2 Liste de films d'action
function showMovieCategory2 () {
    let moviesDetails2 = document.getElementById('moviesDetails2'),
        cat = "2",
        lengthCarousel = moviesDetails2.clientWidth,
        carousel2 = document.querySelector(".carousel2"),
        scrollNextPrev2 = moviesDetails2.clientWidth,
        next2 = document.querySelector('.next2'),
        prev2 = document.querySelector('.prev2'),
        movieCounter2 = 0; // Compteur de film
        nbrMovies2 = 0; // Nombre total de film
        nbrPages2 = [1, 2, 3];
    prev2.style.display = "flex";
    next2.style.display = "flex";
    nbrPages2.forEach(nbrPage2 => {
    let infoPage2 = "http://127.0.0.1:8000/api/v1/titles/?genre_contains=Action&page=" + nbrPage2 + "&sort_by=-year%2C-imdb_score"
    fetch(infoPage2)
        .then(response => response.json())
        .then(data2 => {
            let movies2 = data2.results;
            movies2.forEach(movie2 => {
                movieCounter2 += 1
                let movieInfo2 = document.createElement('div');
                movieInfo2.innerHTML = `
                    <a href="javascript:void(0);">
                    <img class="category2" src="${movie2.image_url}" alt="${movie2.title}" onclick="showMovie('${movie2.url}', '${cat}')">
                    </a>
                `;
                moviesDetails2.appendChild(movieInfo2)
                nbrMovies2 = movies2.length * nbrPages2.length;
                if (movieCounter2 === nbrMovies2) {
                    showMovieCategory3();
                }
            });
        });
    });
next2.addEventListener("click", e => {
    let width = moviesDetails1.children[0].clientWidth + gap;
    carousel2.scrollBy(width, 0);
    scrollNextPrev2 += width
    if (scrollNextPrev2 === 0) {
        prev2.style.display = "flex";
    }
    if (scrollNextPrev2 >= carousel2.scrollWidth) {
        next2.style.display = "none";
    }
});

prev2.addEventListener("click", e => {
    let width = moviesDetails1.children[0].clientWidth + gap;
    carousel2.scrollBy(-width, 0);
    scrollNextPrev2 -= width
    if (scrollNextPrev2 <= lengthCarousel) {
        prev2.style.display = "none";
    }
    if (scrollNextPrev2 < carousel2.scrollWidth) {
        next2.style.display = "flex";
    }
});
}


// Catégorie 3 Liste de films Thriller
function showMovieCategory3 () {
    let moviesDetails3 = document.getElementById('moviesDetails3');
        cat = "3";
        lengthCarousel = moviesDetails3.clientWidth;
        carousel3 = document.querySelector(".carousel3");
        scrollNextPrev3 = moviesDetails3.clientWidth;
        next3 = document.querySelector('.next3');
        prev3 = document.querySelector('.prev3');
        movieCounter3 = 0; // Compteur de film
        nbrMovies3 = 0; // Total nombre de film
        nbrPages3 = [1, 2, 3];
    prev3.style.display = "flex";
    next3.style.display = "flex";
    nbrPages3.forEach(nbrPage3 => {
    let infoPage3 = "http://127.0.0.1:8000/api/v1/titles/?genre_contains=Thriller&page=" + nbrPage3 + "&sort_by=-year%2C-imdb_score"
    fetch(infoPage3)
        .then(response => response.json())
        .then(data3 => {
            let movies3 = data3.results;  // La liste des films se trouve dans data3.results
            movies3.forEach(movie3 => {
                movieCounter3 += 1
                // Pour chaque film, un élément est créer pour affichez l'image'
                let movieInfo3 = document.createElement('div');
                movieInfo3.innerHTML = `
                    <a href="javascript:void(0);">
                    <img class="category3" src="${movie3.image_url}" alt="${movie3.title}" onclick="showMovie('${movie3.url}', '${cat}')">
                    </a>
                `;
                moviesDetails3.appendChild(movieInfo3);
                nbrMovies3 = movies3.length * nbrPages3.length;
                if (movieCounter3 === nbrMovies3) {
                    showMovieCategory4();
                }
            });
        });
    });
next3.addEventListener("click", e => {
    let width = moviesDetails1.children[0].clientWidth + gap;
    carousel3.scrollBy(width, 0);
    scrollNextPrev3 += width
    if (scrollNextPrev3 === 0) {
        prev3.style.display = "flex";
    }
    if (scrollNextPrev3 >= carousel3.scrollWidth) {
        next3.style.display = "none";
    }
});

prev3.addEventListener("click", e => {
    let width = moviesDetails1.children[0].clientWidth + gap;
    carousel3.scrollBy(-width, 0);
    scrollNextPrev3 -= width
    if (scrollNextPrev3 <= lengthCarousel) {
        prev3.style.display = "none";
    }
    if (scrollNextPrev3 < carousel3.scrollWidth) {
        next3.style.display = "flex";
    }
});
}

// Catégorie 4 Liste de films d'horreur
function showMovieCategory4 () {
    let moviesDetails4 = document.getElementById('moviesDetails4');
        cat = "4";
        lengthCarousel = moviesDetails4.clientWidth;
        carousel4 = document.querySelector(".carousel4");
        scrollNextPrev4 = moviesDetails4.clientWidth;
        next4 = document.querySelector('.next4');
        prev4 = document.querySelector('.prev4');
        nbrPages4 = [1, 2, 3];
    prev4.style.display = "flex";
    next4.style.display = "flex";
    nbrPages4.forEach(nbrPage4 => {
    let infoPage4 = "http://127.0.0.1:8000/api/v1/titles/?genre_contains=Horror&page=" + nbrPage4 + "&sort_by=-year%2C-imdb_score";
    fetch(infoPage4)
        .then(response => response.json())
        .then(data4 => {
            let movies4 = data4.results;
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

next4.addEventListener("click", e => {
    let width = moviesDetails1.children[0].clientWidth + gap;
    carousel4.scrollBy(width, 0);
    scrollNextPrev4 += width
    if (scrollNextPrev4 === 0) {
        prev4.style.display = "flex";
    }
    if (scrollNextPrev4 >= carousel4.scrollWidth) {
        next4.style.display = "none";
    }
});

prev4.addEventListener("click", e => {
    let width = moviesDetails1.children[0].clientWidth + gap;
    carousel4.scrollBy(-width, 0);
    scrollNextPrev4 -= width
    if (scrollNextPrev4 <= lengthCarousel) {
        prev4.style.display = "none";
    }
    if (scrollNextPrev4 < carousel4.scrollWidth) {
        next4.style.display = "flex";
    }
});
}

window.addEventListener("resize", e => (width = moviesDetails1.children[0].clientWidth + gap));


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
