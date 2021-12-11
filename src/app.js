function displayCurrentConditions(response) {
    let temperatureElement = document.querySelector("#celsius-temperature");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    let descriptionElement = document.querySelector("#description");
    let iconElement = document.querySelector("#icon");

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    descriptionElement.innerHTML = response.data.weather[0].description;
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", `response.data.weather[0].description`);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let currentCity = document.querySelector("#city");
    currentCity.innerHTML = `${cityInput.value}`;

    let apiKey = "b0c8bbe6abc74ddc23b034afa70b96c3";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayCurrentConditions);
}

let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;


let celsiusTemperature = "null";

let form = document.querySelector("form");
form.addEventListener("click", handleSubmit);

