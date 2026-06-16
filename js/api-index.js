
function getWeatherIcon(code){
    if (code === 0 || code === 1) return "wi-day-sunny";
    else if (code === 2 || code === 3) return "wi-cloudy";
    else if (code === 45 || code === 48) return "wi-fog";
    else if (code === 51 || code === 53 || code === 55) return "wi-sprinkle";
    else if (code === 61 || code === 63 || code === 65) return "wi-rain";
    else if (code === 80 || code === 81 || code === 82) return "wi-rain";
    else if (code === 95 || code === 96 || code === 99) return "wi-thunderstorm";
    else if (code === 71 || code === 73 || code === 75) return "wi-snow";
}

function getWeatherDesc(code){
    if (code === 0 || code === 1) return "Sunny";
    else if (code === 2 || code === 3) return "Cloudy";
    else if (code === 45 || code === 48) return "Foggy";
    else if (code === 51 || code === 53 || code === 55) return "Light Rain";
    else if (code === 61 || code === 63 || code === 65) return "Rain";
    else if (code === 80 || code === 81 || code === 82) return "Heavy Rain";
    else if (code === 95 || code === 96 || code === 99) return "Thunderstorm";
    else if (code === 71 || code === 73 || code === 75) return "Snow";
}

/*HOME*/
function getWindIcon(windSpeed){
    if (windSpeed <= 24) return "wi-windy";
    else return "wi-strong-wind";
}

fetch('https://api.open-meteo.com/v1/forecast?latitude=42.331429&longitude=-83.045753&precipitation_unit=inch&temperature_unit=fahrenheit&wind_speed_unit=mph&current=weather_code,apparent_temperature,wind_speed_10m,precipitation,cloud_cover,temperature_2m')
.then(function(response){
    return response.json();
})

.then(function(currData){
const wCode = currData.current.weather_code;
const todayIcon = getWeatherIcon(wCode);
const todayDesc = getWeatherDesc(wCode);
const todayHigh = Math.round(currData.current.temperature_2m);
const feelsLike = Math.round(currData.current.apparent_temperature);
const todaysWeather = document.getElementById("weatherBox");

todaysWeather.innerHTML = `<span class='location'>Detroit, MI</span><div class='today-main'><i class="wi ${todayIcon}"></i><span class='today-temp'>${todayHigh}° · Feels Like: ${feelsLike}</span><span class="description">${todayDesc}</span></div>`;
})

.catch(function(error){
    console.error("Failed to load data:", error);
});







// Nav buttonz
const conditionBtn = document.getElementById('conditionBtn');
conditionBtn.addEventListener('click', function(){
    document.getElementById('condition').style.display = 'block';
    document.getElementById('temperature').style.display = 'none';

    // Conditions fetch
fetch('https://api.open-meteo.com/v1/forecast?latitude=42.331429&longitude=-83.045753&precipitation_unit=inch&temperature_unit=fahrenheit&wind_speed_unit=mph&current=weather_code,wind_speed_10m,precipitation,cloud_cover,temperature_2m,relative_humidity_2m')
.then(function(conResponse){
    return conResponse.json();
})
.then(function(conData){
    console.log("Conditions data: ", conData);

    const conditionsList = document.getElementById('conList');
    conditionsList.innerHTML = ''
    console.log("Condition List: ", conditionsList);

    const wCode = conData.current.weather_code;
    console.log("Current Weather Code: ", wCode);

    const windSpeed = Math.round(conData.current.wind_speed_10m);
    const precip = conData.current.precipitation;
    const clouds = conData.current.cloud_cover;
    const humidity = conData.current.relative_humidity_2m;
    const windIcon = getWindIcon(windSpeed);
    

    const windCard = document.createElement('li');
    windCard.classList.add('conCard');
    windCard.innerHTML = `<span class="cardName">Current Wind Speed</span><i class="wi ${windIcon}"></i><span class="speed">${windSpeed} MPH</span><span class="card-desc">Wind speed measures how fast air is moving near the surface.</span>`;
    conditionsList.appendChild(windCard);

    const precipCard = document.createElement('li');
    precipCard.classList.add('conCard');
    precipCard.innerHTML = `<span class="cardName">Precipitation</span><i class="wi wi-rain"></i><span class="speed">${precip} Inches</span><span class="card-desc">Precipitation measures the amount of rain or snow currently falling, recorded in inches over the past hour.</span>`;
    conditionsList.appendChild(precipCard);

    const cloudCard = document.createElement('li');
    cloudCard.classList.add('conCard');
    cloudCard.innerHTML = `<span class="cardName">Cloud Coverage</span><i class="wi wi-cloudy"></i><span class="speed">${clouds} %</span><span class="card-desc">Cloud coverage indicates the percentage of the sky currently covered by clouds, from 0% (clear) to 100% (fully overcast).</span>`;
    conditionsList.appendChild(cloudCard);

    const humidityCard = document.createElement('li');
    humidityCard.classList.add('conCard');
    humidityCard.innerHTML = `<span class="cardName">Humidity</span><i class="wi wi-humidity"></i><span class="speed">${humidity}%</span><span class="card-desc">Humidity measures the percentage of moisture in the air. High humidity can make temperatures feel hotter than they are.</span>`;
    conditionsList.appendChild(humidityCard);
})
.catch(function(error){
    console.error("Failed to load data:", error);
});

});

const temperatureBtn = document.getElementById('temperatureBtn');
temperatureBtn.addEventListener('click', function(){
    document.getElementById('temperature').style.display = 'block';
    document.getElementById('condition').style.display = 'none';

    // Temperature fetch
fetch('https://api.open-meteo.com/v1/forecast?latitude=42.331429&longitude=-83.045753&temperature_unit=fahrenheit&current=temperature_2m,apparent_temperature')
.then(function(tempResponse){
    return tempResponse.json();
})
.then(function(tempResponse){
    const tempData = tempResponse;
    console.log("Temperature data: ", tempData);
})
.catch(function(error){
    console.error("Failed to load data:", error);
});

// Week view fetch
fetch('https://api.open-meteo.com/v1/forecast?latitude=42.331429&longitude=-83.045753&temperature_unit=fahrenheit&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=America/Detroit')
.then(function(response){
    return response.json();
})
.then(function(data){
    const time = data.daily.time;
    const TempHigh = data.daily.temperature_2m_max;
    const TempLow = data.daily.temperature_2m_min;
    const wCode = data.daily.weather_code;
    console.log("Daily Weather Code: ", wCode);

    const weatherList = document.getElementById("weather-list");
    weatherList.innerHTML = '';
    console.log(weatherList);

    for(let i = 0; i < data.daily.time.length; i++){
        const icon = getWeatherIcon(wCode[i]);
        const date = new Date(time[i] + 'T00:00').toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
        const wTempHigh = Math.round(TempHigh[i]);
        const wTempLow = Math.round(TempLow[i]);
        const weather = document.createElement('li');
        weather.classList.add('weeklyWeather');
        weather.innerHTML = `<span class='card-date'>${date}</span><i class="wi ${icon}"></i><span class='card-highLow'>${wTempHigh}°/${wTempLow}°</span>`;
        weatherList.appendChild(weather);
    }
})
.catch(function(error){
    console.error("Failed to load data:", error);
});
});