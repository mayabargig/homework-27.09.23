const apiKey = '1db5ca268f22182d9e1ebcacac4818a8';

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});

function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    
    fetch(apiUrl)
        .then(response =>{
            console.log(response);
          return response.json()
        })
        .then(data => {
            console.log(data);
            displayWeatherForecast(data);
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
    }

function displayWeatherForecast(data) {
    const weatherForecastDiv = document.getElementById('weatherForecast');
    weatherForecastDiv.innerHTML = '';

    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);
        const temperature = (forecast.main.temp - 273.15).toFixed(2);
        const description = forecast.weather[0].description;
        const iconUrl = "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";

        const forecastHtml = `
            <div>
                <h4>Date: ${date.toDateString()}</h4>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
                <img src="${iconUrl}"/>
            </div>
            <br>
        `;

        weatherForecastDiv.innerHTML += forecastHtml;
    }
}
