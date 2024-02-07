function fetchWeather(){
    const apiKey = "9b08b519d19dee71d87db4ef1d6e38ec";
    const city = document.getElementById("city").value;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

}


const weatherIcon = document.getElementById("weatherIcon");
const temperatureDiv = document.getElementById("temperatureDiv");
const weatherInfo = document.getElementById("weatherInfo");
const hourlyForecast = document.getElementById("hourlyForecast");
