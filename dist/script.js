function fetchWeather(){
    const apiKey = "e696f46d691926518b3c2d56cdd475c0";
    const city = document.getElementById('city').value;


    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


    async function weatherData(url){
        try{
            const response = await fetch(url);
            if(!response.ok){
                throw new Error('Error fetching data!');
            }

            const data = await response.json();
            return data;
        }catch(error){
            console.error('Error fetching Data', error);
            throw new Error('Error fetching data!');
        }
    }

    async function currentWeather(){
        try{
            const data = await weatherData(currentWeatherUrl);
            displayWeather(data);
        }catch(error){
            alert(error.message);
        }
    }

    async function hourlyWeather(){
        try{
            const hourlyData = await weatherData(forecastUrl);
            displayHourlyForecast(hourlyData);
        }catch(error){
            alert(error.message);
        }
    }

    currentWeather();
    hourlyWeather();

    function displayWeather(data){
        const temperatureDiv = document.getElementById('temperatureDiv');
        const weatherDiv = document.getElementById('weatherInfo');
        
        weatherIcon.innerHTML = '';
        temperatureDiv.innerHTML = '';
        weatherDiv.innerHTML = '';

        if(data.cod === '404'){
            weatherDiv.innerHTML = `<p>${data.message}</p>`;
        }else{
            const cityName = data.name;
            const temperature = Math.floor(data.main.temp - 273);
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            const temperatureHTML = `
                <p>${temperature}°c</p>
            `;

            const weatherHTML = `
                <p>${cityName}</p>
                <p>${description}</p>
            `;

            temperatureDiv.innerHTML = temperatureHTML;
            weatherDiv.innerHTML = weatherHTML;
            

            showImage(iconUrl);
        }
    }

    function displayHourlyForecast(hourlyData){
        const hourlyForecast = document.getElementById('hourlyForecast');
        const hourlyItems = hourlyData.list.slice(0, 8);
        
        hourlyItems.forEach(element => {
            const dataTime = new Date(element.dt * 1000);
            const hour = dataTime.getHours();
            const temperature = Math.round(element.main.temp - 273.15);
            const iconCode = element.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;


            const hourlyItemHTML= `
            <div style="display: flex; flex-direction: column; align-items: center; margin-right: 0.75rem;">
            <span style="text-align: center;">${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon" style="width: 2rem; height: 2rem; margin-bottom: 0.25rem;">
            <span style="text-align: center;">${temperature}°C</span>
        </div>
            `;

            hourlyForecast.innerHTML += hourlyItemHTML;
        });
    }

    function showImage(url){
        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.src = url;
        weatherIcon.style.display = 'block';
    }

}