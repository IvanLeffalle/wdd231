
const url = "./data/weather-extremes-data.json"
async function jsonFetch(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayCities(data.extreme_weather_cities);
        console.log(data);
    } catch (error) {
        console.log(error);
    }

}


const displayCities = (cities) => {
    const extremesSection = document.querySelector("#extreme-weather-info");

    for (let city of cities) {
        const cityDiv = document.createElement("div");
        cityDiv.classList.add("city");
        cityDiv.innerHTML = `
            <h4>${city.name}, ${city.country}</h4>
            <div class="climate-info">
                <div>
                    <strong>Notable Title:</strong> ${city.climate_characteristics.notable_title}<br>
                    <strong>Average Annual Temperature:</strong> ${city.climate_characteristics.average_annual_temperature}°C<br>
                    <strong>Annual Rainfall:</strong> ${city.climate_characteristics.annual_rainfall} mm<br>
                    <strong>Humidity:</strong> ${city.climate_characteristics.humidity}%
                </div>
                <div>
                    <strong>Latitude:</strong> ${city.latitude}°<br>
                    <strong>Longitude:</strong> ${city.longitude}°<br>
                    ${city.temperature_data ?
                `<strong>Hottest Month:</strong> ${city.temperature_data.hottest_month}<br>
                        <strong>Max Temperature:</strong> ${city.climate_characteristics.max_temperature}°C` :
                ''}
                </div>
            </div>
        `;
        extremesSection.appendChild(cityDiv);
    }
};
jsonFetch(url);