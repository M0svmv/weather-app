const API_KEY = "&appid=d45385845552dbb4b813e4ba346fda99";
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`;
const units = `&units=metric`;

let search = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn");
let tempField = document.getElementById("temp");
let cityField = document.getElementById("city");
let icon = document.getElementById("icon");
let state = document.getElementById("weatherState");
let wind = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let container = document.getElementsByClassName("container")[0];
let body = document.body;


function fetchWeather(url) {
  fetch(url)
    .then((res) => (!res.ok ? Error("No Response") : res.json()))
    .then((data) => {
      tempField.innerText = parseInt(data.main.temp) + "°C";
      cityField.innerText = data.name + " , " + data.sys.country;
      icon.src = `./assets/imgs/${data.weather[0].icon}.png`;
      wind.innerText = data.wind.speed + " km/h";
      humidity.innerText = data.main.humidity + "%";
      state.innerText = data.weather[0].description;
      let dayNight = data.weather[0].icon[2];

    
      if (dayNight === 'n') {
        container.style.background = "linear-gradient(to top, #283e51, #0a2342)";
        searchBtn.style.background = "#283e51";
        searchBtn.addEventListener('mouseover', () => {
          searchBtn.style.background = "#0a2342";
        });
        searchBtn.addEventListener('mouseout', () => {
          searchBtn.style.background = "#283e51";
        });
        body.style.background = "linear-gradient(315deg, #2234ae 0%, #191714 74%)";
      } else {
        container.style.background = "linear-gradient(to left bottom, skyblue, rgb(75, 75, 255))";
        searchBtn.style.background = "skyblue";
        searchBtn.addEventListener('mouseover', () => {
          searchBtn.style.background = "rgb(75, 75, 255)";
        });
        searchBtn.addEventListener('mouseout', () => {
          searchBtn.style.background = "#1434A4";
        });
        body.style.background = "linear-gradient(315deg, #5ca0f2 0%, #f5f7f6 74%)";
      }

      console.log(dayNight);
      console.log(data);
    })
    .catch((error) => console.error('Error fetching weather data:', error));
}


function getWeatherByCity(cityName) {
  const url = BASE_URL + `q=${cityName}` + API_KEY + units;
  fetchWeather(url);
}


function getWeatherByCoordinates(lat, lon) {
  const url = BASE_URL + `lat=${lat}&lon=${lon}` + API_KEY + units;
  fetchWeather(url);
}


searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const cityName = search.value;
  if (cityName) {
    getWeatherByCity(cityName);
  }
});


window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByCoordinates(lat, lon);
      },
      (error) => {
        console.error('Error getting location:', error);
    
        getWeatherByCity('cairo'); 
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
 
    getWeatherByCity('cairo');
  }
});
