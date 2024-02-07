function fetchWeather(){
    const apiKey = "9b08b519d19dee71d87db4ef1d6e38ec";
    const city = document.getElementById("city").value;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const hourlyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

    async function fetchData(url){
        try{
            const response = await fetch(url);

            if(!response.ok){
                throw new error('Network response is not ok!');
            }

            const data = await response.json();
            return data;
        } catch{
            console.error('Error fetching data: ', error);
            throw new error('Error fetching data. Please try again.');
        }
    }

    async function fetchCurrentWeather(){
        try{
            const data = await fetchData(weatherUrl);
            displayWeather();
        } catch(error){
            alert(error.message);
        }
    }

    async function fetchHourlyWeather(){
        try{
            const data = await fetchData(hourlyForecastUrl);
            displayHourlyForecast(data.list);
        } catch{
            console.error(error.message);
        }
    }

}




const weatherIcon = document.getElementById("weatherIcon");
const temperatureDiv = document.getElementById("temperatureDiv");
const weatherInfo = document.getElementById("weatherInfo");
const hourlyForecast = document.getElementById("hourlyForecast");
