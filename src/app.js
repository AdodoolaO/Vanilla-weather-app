let current = new Date();

console.log(current.getHours());
console.log(current.getMinutes());

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
//create a liveDay function
function liveDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDate = document.querySelector("#date");
  let currentDay = days[current.getDay()];
  currentDate.innerHTML = currentDay;

  let hours = current.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${hours}:${minutes}`;
}

liveDay();

function displayForcast() {
  let forcastElement = document.querySelector("#forcast");
  let days = ["Weds", "Thurs", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
          <div class="col">
          <div>${day}</div>
            <div>  <img class= "forcast-image" src="http://openweathermap.org/img/wn/10d@2x.png" alt="" id="icon" width="50px"/></div>
            <div class="forcast-temp">20°</div>
         
        </div>
       `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forcastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

//looping to display/inject multiple forcasts
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  let apiKey = "04ceffe59fa10e5e23c4c7bf0b0e4eca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  let showTemperature = response.data.main.temp;
  temperature.innerHTML = Math.round(showTemperature);
  let wind = document.querySelector("#speed");
  let showWind = response.data.wind.speed;
  wind.innerHTML = Math.round(showWind);
  let humidity = document.querySelector("#humid");
  let showHumidy = response.data.main.humidity;
  humidity.innerHTML = showHumidy;
  let descrip = document.querySelector("#description");
  let showDescrip = response.data.weather[0].description;
  descrip.innerHTML = showDescrip;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  icon.setAttribute("alt", response.data.weather[0].description);

  celsius.classList.add("active");
  farenHeit.classList.remove("active");
}

function convertBackToCelsius(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  let apiKey = "04ceffe59fa10e5e23c4c7bf0b0e4eca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function convertUnitToFarenheit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  let apiKey = "04ceffe59fa10e5e23c4c7bf0b0e4eca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showConvert);
}

function showConvert(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp * 1.8 + 32);
  celsius.classList.remove("active");
  farenHeit.classList.add("active");
}

let farenHeit = document.querySelector("#farenheit");
farenHeit.addEventListener("click", convertUnitToFarenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertBackToCelsius);

let city = document.querySelector("#form");
city.addEventListener("submit", searchCity);
displayForcast();
