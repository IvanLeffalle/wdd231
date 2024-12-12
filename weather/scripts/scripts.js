const apiKey = "28a51075e2d24bc2fa20650e03f26056";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const currentYear = new Date().getFullYear();
const year = document.getElementById('year');

const locationName = document.getElementById('location');
const todayIcon = document.getElementById('today-icon');
const todayDesc = document.getElementById('today-desc');
const todayTemp = document.getElementById('today-temp');
const todayFeels = document.getElementById('today-feels');
const humidityCapt = document.getElementById('humidity');
const windCapt = document.getElementById('wind');
const tempMinCapt = document.getElementById('tempMin');
const tempMaxCapt = document.getElementById('tempMax');
const pressureCapt = document.getElementById('pressure');
const visibilityCapt = document.getElementById('visibility');

const searchBox = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');

const forecastContainer = document.getElementById("forecast-container"); // Container for 5-day forecast cards

const defaultCity = "London"; // Default city

async function getWeatherData(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    displayResults(data);
}

async function getForecastData(city) {
    const response = await fetch(forecastUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    displayForecast(data);
}

function displayResults(data) {
    const icon = data.weather[0].icon;
    const iconsrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const desc = data.weather[0].description;
    const temp = Math.round(data.main.temp);
    const location = data.name;
    const country = data.sys.country;
    const feels = Math.round(data.main.feels_like);
    const wind = data.wind.speed;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const visibility = data.visibility;
    const tempMin = Math.round(data.main.temp_min);
    const tempMax = Math.round(data.main.temp_max);

    windCapt.innerHTML = `${wind} meter/sec`;
    humidityCapt.innerHTML = `${humidity}%`;
    pressureCapt.innerHTML = `${pressure} hPa`;
    visibilityCapt.innerHTML = `${visibility} meters`;
    tempMinCapt.innerHTML = `${tempMin}&deg;C`;
    tempMaxCapt.innerHTML = `${tempMax}&deg;C`;

    todayTemp.innerHTML = `${temp}&deg;C`;
    todayDesc.innerHTML = desc;
    locationName.innerHTML = `${location}, ${country}`;
    todayFeels.innerHTML = `Feels like ${feels}&deg;C`;

    todayIcon.setAttribute('src', iconsrc);
    todayIcon.setAttribute('alt', desc);
}

function displayForecast(data) {
    const forecastData = data.list;
    const days = [];
    const options = { weekday: "long" };

    for (let i = 0; i < forecastData.length; i++) {
        const dayIndex = Math.floor(i / 8);

        if (!days[dayIndex]) {
            days[dayIndex] = {
                date: new Date(forecastData[i].dt * 1000).toLocaleDateString("en-US", options),
                temperatures: [],
                icons: []
            };
        }

        days[dayIndex].temperatures.push(forecastData[i].main.temp);
        days[dayIndex].icons.push(forecastData[i].weather[0].icon);
    }

    days.forEach(day => {
        const avgTemp = Math.round(day.temperatures.reduce((acc, temp) => acc + temp, 0) / day.temperatures.length);
        day.avgTemp = avgTemp;
    });

    // Clear any previous forecast data
    forecastContainer.innerHTML = '';

    days.forEach(day => {
        const card = document.createElement("div");
        card.className = "forecast-card";

        const dayTitle = document.createElement("h3");
        dayTitle.textContent = day.date;

        const temp = document.createElement("p");
        temp.textContent = `${day.avgTemp}°C`;

        const forecastIconsrc = `https://openweathermap.org/img/wn/${day.icons[0]}@2x.png`;
        const forecastIcon = document.createElement("img");
        forecastIcon.setAttribute("src", forecastIconsrc);
        forecastIcon.setAttribute("alt", "Weather Icon");
        forecastIcon.className = "forecast-icon";

        card.appendChild(dayTitle);
        card.appendChild(forecastIcon);
        card.appendChild(temp);

        forecastContainer.appendChild(card);
    });
}

// Call the functions for the default city when the page loads
getWeatherData(defaultCity);
getForecastData(defaultCity);

searchBtn.addEventListener('click', () => {
    const city = searchBox.value;
    getWeatherData(city);
    getForecastData(city);
});

year.innerHTML = currentYear;
