/*
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
*/

/**
 * When the page loads i can start my search using the text box or recently searched cities. if no cities have been searched present default values.
 * * NEED EVENT LISTENER to call first function
 * * ADD SEARCH TO RECENT SEARCH HISTORY
 *
 * once the search is executed on the web app, the appropriate data is passed through the Openweather API and results are returned
 * * API GET CALL
 * * API Results stored to local
 * * * City Name
 * * * Date
 * * * Icon of Weather Conditions (IN API???)
 * * * Temperature
 * * * Humidity
 * * * Wind Speed
 * * * UV Index
 * * * * * ICON for weather conditions (IN API???)
 *
 * Once results are returned i want to ensure the approprate icon is present for weather conditions and UV index.
 * * FUNCTION FOR CHECKING ICON OF WEATHER CONDITION
 * * FUNCTION FOR CHECKING ICON OF UV INDEX
 * *
 * * DIPLAYING RESULTS
 * * * first card:
 * * * * * Detailed View
 * * * Second card:
 * * * * * condensed view (Date, icon, temp, humidity)
 */
var citiesSearched = [];
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

var buttonSubmit = document.getElementById("search-button");

//set common class for all buttons and then look for the event on that specific class
buttonSubmit.addEventListener("click", () => getAPI())


function setSearchedCity(city, results, data) {
    var temperature = results[0].main.temp;
    //var date = results[0].dt_txt;
    var humidity = results[0].main.humidity;
    var windSpeed = results[0].wind.speed;
    var imageURL = results[0].weather[0].icon;
    var uvIndex = data.current.uvi;

    //updated data on HTML Searched City
    document.getElementById("searched-city").textContent = city;
    document.getElementById("searched-image").setAttribute("src", `https://openweathermap.org/img/wn/${imageURL}@2x.png`);
    document.getElementById("temperature").textContent = `Temperature: ${temperature}*F`;
    document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${windSpeed} MPH`;
    document.getElementById("uv-index").textContent = `UV Index: ${uvIndex}`;
};

function setFiveDay(data) {
    var availableDays = ["one", "two", "three", "four", "five"];
    var fiveDayResults = data.daily;


    for (let i = 1; i < 6; i++) {
        var day = new Date(fiveDayResults[i].dt * 1000);
        var string = JSON.stringify(day);
        var cutOff = string.lastIndexOf("T");
        var dayShort = string.slice(1, cutOff);

        var dateSelector = `day-${availableDays[i - 1]}`;

        var temp = fiveDayResults[i].temp.day;
        var tempSelector = `${availableDays[i - 1]}-temp`;

        var humid = fiveDayResults[i].humidity;
        var humidSelector = `${availableDays[i - 1]}-humidity`;

        var fiveDayIcon = fiveDayResults[i].weather[0].icon;
        var imgSelector = `${availableDays[i - 1]}-image`;

        document.getElementById(dateSelector).textContent = dayShort;
        document.getElementById(tempSelector).textContent = `Temp: ${temp}* F`;
        document.getElementById(humidSelector).textContent = `Humidity: ${humid}%`;
        document.getElementById(imgSelector).setAttribute("src", `https://openweathermap.org/img/wn/${fiveDayIcon}@2x.png`);
    }
};

function getAPI() {

    var city = document.getElementById("search-input").value;
    console.log(city);
    citiesSearched.unshift(city);
    citiesSearched.length = 4;
    console.log(citiesSearched);
    localStorage.setItem("search", citiesSearched);

    var requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=acaa48cd5a14b6aa31f93113ccf288cc&units=imperial`;


    fetch(requestURL, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;
            var results = data.list;


            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely,alerts&appid=6b8690633d63e8bf4fb81fc2fa7b972d`, requestOptions)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    setSearchedCity(city, results, data);
                    setFiveDay(data);
                })
                .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error));
}

function fixedSearch(city) {

    console.log(city);
    citiesSearched.unshift(city);
    citiesSearched.length = 4;
    console.log(citiesSearched);
    localStorage.setItem("search", citiesSearched);

    var requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=acaa48cd5a14b6aa31f93113ccf288cc&units=imperial`;


    fetch(requestURL, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;
            var results = data.list;


            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely,alerts&appid=6b8690633d63e8bf4fb81fc2fa7b972d`, requestOptions)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    setSearchedCity(city, results, data);
                    setFiveDay(data);
                })
                .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error));
}






