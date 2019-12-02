"use strict";

const searchBtn = document.querySelector(".js-button");
let seriesInput = document.querySelector(".js-input");
const seriesList = document.querySelector(".js-series-container");
const seriesListFav = document.querySelector(".js-fav-series-container");

let series = [];
let favoritesSeries = [];

function getServerData() {
  fetch(`http://api.tvmaze.com/search/shows?q=${seriesInput.value}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(serverData) {
      series = serverData;
      paintSeries();
      listenSeries();
      paintFavoritesSeries();
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor");
    });
}
getServerData();

///PINTAR SERIES\\\

function paintSeries() {
  let htmlCode = "";
  for (let i = 0; i < series.length; i++) {
    const favoriteIndex = favoritesSeries.findIndex(function(item, index) {
      return item.id === favoriteIndex;
    });
    const isFavorite = favoriteIndex !== -1;

    console.log("fav", favoritesSeries, "actual id", i);

    if (isFavorite === true) {
      htmlCode += `<li class="js-serie-element serie__element--fav" id="${series[i].show.id}">`;
      htmlCode += `<img src="${series[i].show.image.medium}" class="js-serie-image serie__image"/>`;
      htmlCode += `<h3 class="js-serie-title serie__title--fav">${series[i].show.name}</h3>`;
    } else {
      htmlCode += `<li class="js-serie-element serie__element" id="${series[i].show.id}">`;
      htmlCode += `<img src="${series[i].show.image.medium}" class="js-serie-image serie__image"/>`;
      htmlCode += `<h3 class="js-serie-title serie__title">${series[i].show.name}</h3>`;
    }
    htmlCode += `</li>`;

    //   for (const serie of series) {
    //     htmlCode += `<li class="js-serie-element serie__element" id="${serie.show.id}">`;
    //     htmlCode += `<img src="${serie.show.image.medium}" class="js-serie-image serie__image"/>`;
    //     htmlCode += `<h3 class="js-serie-title serie__title">${serie.show.name}</h3>`;
    //     htmlCode += `</li>`;
    // console.log(series[i].show.name);
    // console.log(series[i].show.image.medium);
    // console.log(series[i].show.id);
  }
  seriesList.innerHTML = htmlCode;
}

///ESCUCHAR SERIES\\\

function toggleFavorites(event) {
  const clickedId = parseInt(event.currentTarget.id);
  const clickedIndex = favoritesSeries.findIndex(function(item, index) {
    return item.id === clickedId;
  });
  const isFavorite = clickedIndex !== -1;
  if (isFavorite === true) {
    favoritesSeries.splice(clickedIndex, 1);
    // console.log("es favorito? y lo saco");
  } else {
    for (let i = 0; i < series.length; i++) {
      if (series[i].show.id === clickedId) {
        favoritesSeries.push(series[i].show);
        // console.log("No es favorito y lo meto");
      }
    }
  }

  console.log(event.currentTarget.id, favoritesSeries);
  console.log(clickedIndex);
  paintFavoritesSeries();
}

function listenSeries() {
  const serieElements = document.querySelectorAll(".js-serie-element");
  for (const serieElement of serieElements) {
    serieElement.addEventListener("click", toggleFavorites);

    // console.log(serieElement);
  }
}

///PINTAR SERIES FAVORITAS\\\

function paintFavoritesSeries() {
  let htmlCode = "";
  htmlCode += `<li><h3>Mis series favoritas:</h3></li>`;
  for (const favoritesSerie of favoritesSeries) {
    htmlCode += `<li class="js-serie-element serie__element" id="${favoritesSerie.id}">`;
    htmlCode += `<img src="${favoritesSerie.image.medium}" class="js-serie-image serie__image"/>`;
    htmlCode += `<h3 class="js-serie-title serie__title">${favoritesSerie.name}</h3>`;
    htmlCode += `</li>`;
  }

  seriesListFav.innerHTML = htmlCode;
}

///FUNCTION MATHERFUCKER\\\

function handleFormSubmit(event) {
  event.preventDefault();
  getServerData();
  console.log(seriesInput.value);
}

searchBtn.addEventListener("click", handleFormSubmit);

//# sourceMappingURL=main.js.map
