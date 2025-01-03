const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=28a51075e2d24bc2fa20650e03f26056'



const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

async function apiFetch() {
    try {
        const response = await fetch(url);
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
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;

    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconsrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

apiFetch();
