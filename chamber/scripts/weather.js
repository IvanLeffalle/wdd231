const urlWeather = 'https://api.openweathermap.org/data/2.5/weather?lat=-27.47&lon=-58.95&units=metric&appid=28a51075e2d24bc2fa20650e03f26056'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-27.47&lon=-58.95&units=metric&appid=77f43f231f85bb78a67b95ae6cca9924'

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const humidityCapt = document.querySelector('#humidityCurr');
const feels = document.querySelector('#real-feel')
const windCapt = document.querySelector('#windCurr')
const tempMin = document.querySelector('#tempMin')
const tempMax = document.querySelector('#tempMax')

async function apiFetch() {
    try {
        const response = await fetch(urlWeather);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {

    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconsrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const humidity = data.main.humidity
    const wind = data.wind.speed;
    const realFeels = data.main.feels_like;
    const temperatureMax = data.main.temp_max;
    const temperatureMin = data.main.temp_min;


    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;

    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    humidityCapt.innerHTML = `${humidity}%  `;
    windCapt.innerHTML = `${wind} meter/sec`
    feels.innerHTML = `Real Feel ${realFeels}&deg;C`
    tempMax.innerHTML = ` ${temperatureMax}`;
    tempMin.innerHTML = `${temperatureMin}`
}


/*forecast Section*/

/*Icons */
const forecastIconTomorrow = document.querySelector('#forecastIcon-Tomorrow');
const forecastIcondayAfter = document.querySelector('#forecastIcon-dayAfter');
const forecastIcondayAfterAfter = document.querySelector('#forecastIcon-dayAfterAfter');
/*Temp*/
const tomorrowTemp = document.querySelector('#tomorrowTemp');
const AftertomorrowTemp = document.querySelector('#AfterTomorrowTemp');
const AfterAftertomorrowTemp = document.querySelector('#AfterAftertomorrowTemp')
/*Desc*/
const TomorrowDesc = document.querySelector('#tomorrowDesc')
const AfterTomorrowDesc = document.querySelector('#AfterTomorrowDesc')
const AfterAfterTomorrowDesc = document.querySelector('#AfterAfterTomorrowDesc')


async function forecastFetch() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayForecast(data) {
    const iconTomorrow = data.list[1].weather[0].icon;
    const iconAfter = data.list[2].weather[0].icon;
    const iconAfterAfter = data.list[3].weather[0].icon;

    const iconTomorrowSrc = `https://openweathermap.org/img/wn/${iconTomorrow}@2x.png`;
    const iconAfterSrc = `https://openweathermap.org/img/wn/${iconAfter}@2x.png`;
    const iconAfterAfterSrc = `https://openweathermap.org/img/wn/${iconAfterAfter}@2x.png`;

    forecastIconTomorrow.setAttribute('src', iconTomorrowSrc);
    forecastIcondayAfter.setAttribute('src', iconAfterSrc);

    forecastIcondayAfterAfter.setAttribute('src', iconAfterAfterSrc);

    /*Temp Data */

    const tomorrowTempData = data.list[0].main.temp
    const AftertomorrowTempData = data.list[1].main.temp
    const AfterAftertomorrowTempData = data.list[2].main.temp


    tomorrowTemp.innerHTML = `${tomorrowTempData}&deg;C`
    AftertomorrowTemp.innerHTML = `${AftertomorrowTempData}&deg;C`
    AfterAftertomorrowTemp.innerHTML = `${AfterAftertomorrowTempData}&deg;C`

    /*Desc data*/
    const descTomorrow = data.list[0].weather[0].description;
    const descAfterTomorrow = data.list[1].weather[0].description;
    const descAfterAfterTomorrow = data.list[2].weather[0].description;

    TomorrowDesc.innerHTML = `${descTomorrow}`
    AfterTomorrowDesc.innerHTML = `${descAfterTomorrow}`
    AfterAfterTomorrowDesc.innerHTML = `${descAfterAfterTomorrow}`







}



const todayId = document.querySelector('#today')
const tomorrowId = document.querySelector('#tomorrow')
const dayAfterTomorrowId = document.querySelector('#dayAfterTomorrow')
const dayAfterAfterTomorrowId = document.querySelector('#dayAfterAfterTomorrow')


const today = new Date();
const tomorrow = new Date(today);
const dayAfterTomorrow = new Date(today);
const dayAfterAfterTomorrow = new Date(today);

tomorrow.setDate(today.getDate() + 1);
dayAfterTomorrow.setDate(today.getDate() + 2);
dayAfterAfterTomorrow.setDate(today.getDate() + 3);

const option = { weekday: 'long' };

const dayName = today.toLocaleDateString('en-US', option);
const tomorrowName = tomorrow.toLocaleDateString('en-US', option);
const afterTomorrowName = dayAfterTomorrow.toLocaleDateString('en-US', option);
const afterAfterTomorrow = dayAfterAfterTomorrow.toLocaleDateString('en-US', option);


todayId.innerHTML = `${dayName}`
tomorrowId.innerHTML = `${tomorrowName}`
dayAfterTomorrowId.innerHTML = `${afterTomorrowName}`
dayAfterAfterTomorrowId.innerHTML = `${afterAfterTomorrow}`



forecastFetch();
apiFetch();
