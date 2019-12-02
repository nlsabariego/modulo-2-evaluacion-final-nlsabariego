"use strict";

const searchBtn = document.querySelector(".js-button");
let seriesInput = document.querySelector(".js-input");
const seriesList = document.querySelector(".js-series-container");

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
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor");
    });
}
getServerData();

///PINTAR SERIES\\\

function paintSeries() {
  let htmlCode = "";
  for (const serie of series) {
    htmlCode += `<li class="js-serie-element serie__element" id="${serie.show.id}">`;
    htmlCode += `<img src="${serie.show.image.medium}" class="js-serie-image serie__image"/>`;
    htmlCode += `<h3 class="js-serie-title serie__title">${serie.show.name}</h3>`;
    htmlCode += `</li>`;
    console.log(serie.show.name);
    console.log(serie.show.image.medium);
    console.log(serie.show.id);
  }
  seriesList.innerHTML = htmlCode;
}

///ESCUCHAR SERIES\\\

function toggleFavorites(event) {
  console.log(event.currentTarget.id);
}

function listenSeries() {
  const serieElements = document.querySelectorAll(".js-serie-element");
  for (const serieElement of serieElements) {
    serieElement.addEventListener("click", toggleFavorites);

    // console.log(serieElement);
  }
}

///FUNCTION MATHERFUCKER\\\

function handleFormSubmit(event) {
  event.preventDefault();
  getServerData();
  console.log(seriesInput.value);
}

searchBtn.addEventListener("click", handleFormSubmit);

//# sourceMappingURL=main.js.map
