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
            const data = await weatherData(forecastUrl);
            displayHourlyForecast(data);
        }catch(error){
            alert(error.message);
        }
    }

    currentWeather();
    // hourlyWeather();

    function displayWeather(data){
        const temperatureDiv = document.getElementById('temperatureDiv');
        const weatherDiv = document.getElementById('weatherInfo');
        
        weatherIcon.innerHTML = '';
        temperatureDiv.innerHTML = '';
        weatherDiv.innerHTML = '';

        if(data.cod === '404'){

        }else{
            const cityName = data.name;
            const temperature = Math.floor(data.main.temp - 273);
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/img/wn/${iconCode}@4x.png`;

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

    function showImage(url){
        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.src = url;
        weatherIcon.style.display = 'block';
    }

}