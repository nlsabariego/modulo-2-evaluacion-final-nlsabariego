"use strict";

const searchBtn = document.querySelector(".js-button");
let seriesInput = document.querySelector(".js-input");

let series = [];

function getServerData() {
  fetch(`http://api.tvmaze.com/search/shows?q=${seriesInput.value}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(serverData) {
      series = serverData;
      console.log(series);
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor");
    });
}
getServerData();

///FUNCTION MATHERFUCKER\\\

function handleFormSubmit(event) {
  event.preventDefault();
  getServerData();
  console.log(seriesInput.value);
}

searchBtn.addEventListener("click", handleFormSubmit);
