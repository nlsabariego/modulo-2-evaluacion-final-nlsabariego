"use strict";

const searchBtn = document.querySelector(".js-button");
let seriesInput = document.querySelector(".js-input");
const seriesList = document.querySelector(".js-series-container");

let series = [];

function getServerData() {
  fetch(`http://api.tvmaze.com/search/shows?q=${seriesInput.value}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(serverData) {
      series = serverData;
      paintSeries();
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor");
    });
}
getServerData();

///FUNTION PAINTSERIES\\\

function paintSeries() {
  let htmlCode = "";
  //   for (let i = 0; i < series.length; i++) {
  for (const serie of series) {
    htmlCode += `<li class="js-serieElement serie__element">`;
    htmlCode += `<img src="${serie.show.image.medium}" class="js-serie-image serie__image"/>`;
    htmlCode += `<h3 class="js-serie-title serie__title">${serie.show.name}</h3>`;
    htmlCode += `</li>`;
    console.log(serie.show.name);
    console.log(serie.show.image.medium);
  }
  seriesList.innerHTML = htmlCode;
}
// }

///FUNCTION MATHERFUCKER\\\

function handleFormSubmit(event) {
  event.preventDefault();
  getServerData();
  console.log(seriesInput.value);
}

searchBtn.addEventListener("click", handleFormSubmit);

//# sourceMappingURL=main.js.map
