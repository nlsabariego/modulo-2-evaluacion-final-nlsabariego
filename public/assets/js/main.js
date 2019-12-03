"use strict";

const searchBtn = document.querySelector(".js-button");
let seriesInput = document.querySelector(".js-input");
const seriesList = document.querySelector(".js-series-container");
const seriesListFav = document.querySelector(".js-fav-series-container");

let series = [];
let favoritesSeries = [];

///LOCAL STORAGE\\\

function setLocalStorage() {
  //guardado en local storage
  localStorage.setItem("favoritesSeries", JSON.stringify(favoritesSeries));
}
function getLocalStorage() {
  const localStorageFavoritesSeries = JSON.parse(localStorage.getItem("FavoritesSeries"));
  console.log("comprobando", localStorageFavoritesSeries);
  if (localStorageFavoritesSeries !== null) {
    console.log("tengo datos");
    FavoritesSeries = localStorageFavoritesSeries;
    paintFavoritesSeries();
    listenSeries();
  } else {
    console.log("no tengo datos");
  }
}

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
      console.error("Error al traer los datos del servidor", err);
    });
}
getServerData();

///PINTAR SERIES\\\

function paintSeries() {
  let htmlCode = "";
  for (let i = 0; i < series.length; i++) {
    const favoriteIndex = favoritesSeries.findIndex(function(item, index) {
      return item.id === series[i].show.id;
    });
    const isFavorite = favoriteIndex !== -1;

    console.log("fav", favoritesSeries, "actual id", i);

    if (isFavorite === true) {
      htmlCode += `<li class="js-serie-element serie__element--fav" id="${series[i].show.id}">`;
    } /* if (isFavorite === -1)*/ else {
      htmlCode += `<li class="js-serie-element serie__element" id="${series[i].show.id}">`;
    }

    if (series[i].show.image !== null) {
      htmlCode += `<img src="${series[i].show.image.medium}" class="js-serie-image serie__image"/>`;
    } else {
      htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?
        text=TV." class="js-serie-image serie__image"/>`;
    }

    htmlCode += `<h3 class="js-serie-title serie__title">${series[i].show.name}</h3>`;
    htmlCode += `</li>`;
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
  console.log(isFavorite);
  paintSeries();
  listenSeries();
  paintFavoritesSeries();
  setLocalStorage();
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
  getLocalStorage();
  getServerData();
  paintSeries();
  toggleFavorites(event);
  listenSeries();
  paintFavoritesSeries();

  // console.log(seriesInput.value);
}

searchBtn.addEventListener("click", handleFormSubmit);

getLocalStorage();

//# sourceMappingURL=main.js.map
