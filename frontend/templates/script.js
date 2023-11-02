//script.js

document.addEventListener('DOMContentLoaded', () => {
    const filmNumber1Area = document.getElementById('filmNumber1Area');

    fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score,-votes')
        .then(response => response.json())

        .then(films => {
            const bestFilmData = films.results; // Ma liste de film selectionné se trouve dans le champ "results"

            // Selection du meilleur film
            let selectFilm = bestFilmData[0];

            // Selection de l'id du film
            let idSelect = selectFilm.id;

        fetch(`http://127.0.0.1:8000/api/v1/titles/${idSelect}`)
            .then(response => response.json())
            .then(film => {
                const filmInfo = document.createElement('div');
                // Ajout des informations d'un film dans chaque balise

                let bestImage = "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/6116cc072824771992111acec7ba236e177d3e1975b87fa574dffb64f49a5b94._RI_TTW_SX720_FMjpg_.jpg";

                filmInfo.innerHTML = `
                    <h2 class="film_title">${selectFilm.title}</h2>
                    <p class="description">${film.description}</p>
                    <img class="single_image" src="${bestImage}" alt="${selectFilm.title}">

            `;
                filmNumber1Area.appendChild(filmInfo);
            });
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const filmDetails = document.getElementById('filmDetails');

    fetch('http://127.0.0.1:8000/api/v1/titles/?genre_contains=Thriller&&sort_by=-year,-imdb_score')
        .then(response => response.json())

        .then(data => {
            const films = data.results;  // La liste des films se trouve dans data.results

            films.forEach(film => {
                // Pour chaque film, créez un élément et affichez l'image'
                const filmInfo = document.createElement('div');
                filmInfo.innerHTML = `

                    <img class="categorie1" src="${film.image_url}" alt="${film.title}">
                `;
                filmDetails.appendChild(filmInfo);
            });
        });
});
