function formatDate(response) {
    let date = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let hours = date.getHours();
        if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
        if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `Last updated: ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
  return days[day];
} 

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
             <div class="card border-dark mb-2">
              <div class="card-header weather-forecast-day">
                ${formatDay(forecastDay.dt)}
              </div>
              <img src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="36" class="forecast-icon" />
                <div class="weather-forecast-temperatures">
                 <span class="weather-forecast-temperature-max"> ${Math.round(
                   forecastDay.temp.max
                 )}°</span>
                 <span class="weather-forecast-temperature-min">  ${Math.round(
                   forecastDay.temp.min
                 )}°</span>
                </div>
              </div>
            </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "b0c8bbe6abc74ddc23b034afa70b96c3";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);
}

function displayCurrentConditions(response) {
    let cityElement = document.querySelector("#city");
    let temperatureCelsiusElement = document.querySelector("#celsius-temperature");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    let descriptionElement = document.querySelector("#description");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    cityElement.innerHTML = response.data.name;
    temperatureCelsiusElement.innerHTML = Math.round(response.data.main.temp);
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    descriptionElement.innerHTML = response.data.weather[0].description;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", `response.data.weather[0].description`);

    getForecast(response.data.coord);
}

function search(city){
  let apiKey = "b0c8bbe6abc74ddc23b034afa70b96c3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentConditions);
} 

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
search("London");
