function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let currentCity = document.querySelector("#city");
    currentCity.innerHTML = `${cityInput.value}`;
}





let apiKey = "b0c8bbe6abc74ddc23b034afa70b96c3";
units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=${units}`;
// axios.get(apiUrl).then(displayCurrentConditions);

let form = document.querySelector("form");
form.addEventListener("click", handleSubmit);


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