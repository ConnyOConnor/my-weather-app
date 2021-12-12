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
    return `${day} ${hours}:${minutes}`;
}

function displayCurrentConditions(response) {
    let temperatureCelsiusElement = document.querySelector("#celsius-temperature");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    let descriptionElement = document.querySelector("#description");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureCelsiusElement.innerHTML = Math.round(response.data.main.temp);
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    descriptionElement.innerHTML = response.data.weather[0].description;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
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

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#celsius-temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#celsius-temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = "null";

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);