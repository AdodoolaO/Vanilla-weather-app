function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  let apiKey = "04ceffe59fa10e5e23c4c7bf0b0e4eca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let city = document.querySelector("#form");
city.addEventListener("submit", searchCity);

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
}
