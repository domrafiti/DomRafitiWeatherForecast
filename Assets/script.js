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
function setSearchedCity(city, temperature, date, humidity, windspeed,) {

}


function getAPI(city) {
    var requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=acaa48cd5a14b6aa31f93113ccf288cc&units=imperial`;

    console.log(city);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(requestURL, requestOptions)
        //.then(response => response.text())
        //.then(result => console.log(result))

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data);
            var resultsFull = data;
            //console.log(data.list);
            var results = data.list;

            //Temperature
            var temperature = results[0].main.temp;
            console.log(temperature);
            //Date
            var date = results[0].dt_txt;
            console.log(date);
            //Humidity
            var humidity = results[0].main.humidity;
            console.log(humidity);
            //Wind Speed
            var windSpeed = results[0].wind.speed;
            console.log(windSpeed);
            //Lat
            var lat = resultsFull.city.coord.lat;
            console.log(lat);
            //Lon
            var lon = resultsFull.city.coord.lon;
            console.log(lon);

            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely,alerts&appid=6b8690633d63e8bf4fb81fc2fa7b972d`, requestOptions)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var uvIndex = data.current.uvi;
                    console.log(uvIndex);
                    return uvIndex;
                })
                .catch(error => console.log('error', error));

            document.getElementById("searched-city").textContent = city;
            document.getElementById("temperature").textContent = `Temperature: ${temperature}*F`;
            document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;



            //for (let i = 0; i < array.length; i++) {
            // const element = array[i];

            //}

        })

        .catch(error => console.log('error', error));
}






/** */