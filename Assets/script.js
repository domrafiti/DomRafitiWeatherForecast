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
    citiesSearched.unshift(city);
    citiesSearched.length = 4;
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

    citiesSearched.unshift(city);
    citiesSearched.length = 4;

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






