// const apiKey = '171fb598d0fb2abeb49030c618938528'
// const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

var searchCityEl = document.querySelector('#search-input');
var searchButton = document.querySelector('#search-button');
var cityTitle = document.querySelector('#city-title');
var cityMainTemp = document.querySelector('#temp-body');
var cityMainWind = document.querySelector('#wind-body');
var cityMainHumid = document.querySelector('#humid-body');
var citySubList = document.querySelector('ul')
var futureSubList = document.querySelector('#weatherlist')
var forecastTitle = document.querySelector("#forecast");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");


var cities = [];

// function to save cities in local storage
var saveCities = function() {
    localStorage.setItem('cities', JSON.stringify(cities))
};

var citySubmitSearch = function (event) {
    event.preventDefault();
    var city = searchCityEl.value.trim();
    if (city) {
        getWeather(city);
        get5Day(city);
        cities.unshift({city});
        searchCityEl.value = "";
    } else {
        console.alert('please enter a city')
    }

    saveCities();

}

var getWeather = function() {
    var city = searchCityEl.value.trim();
    var apiKey = 'f52d20ae2850eece0e07fed1067fd26e'
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response) {
        response.json()
        .then(function (data) {
            console.log(data, "This is the Get Weather data")
            showCurrentCityWeather(data, city)
        })
    })
};

var showCurrentCityWeather = function(weather, searchCity) {
    cityTitle.textContent = "";
    cityTitle.textContent=searchCity;
    // cityTitle.classList = "city-title"

    var currentDate = document.createElement('span')
    // currentDate.textContent= " (" + (weather.dt.value).format("MMM D, YYYY") + ") ";
    // searchCityEl.appendChild(currentDate)

    var weatherIcon = document.createElement('img')
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`);
    searchCityEl.appendChild(weatherIcon)

    var tempEl = document.createElement('span');
    tempEl.textContent = "Temp: " + weather.main.temp + " °F";
    tempEl.classList = "list-group-item"
    citySubList.appendChild(tempEl);

    var WindSpeed = document.createElement('span');
    WindSpeed.textContent = "Wind Speed:" + weather.wind.speed + "MPH";
    WindSpeed.classList = "list-group-item"
    citySubList.appendChild(WindSpeed);

    var humidity = document.createElement('span');
    humidity.textContent = "Humidity:" + weather.main.humidity + " %";
    humidity.classList = "list-group-item"
    citySubList.appendChild(humidity);

}



var show5Day = function(weather) {
    futureSubList.textContent = "";
    forecastTitle.textContent = "5-Day Forecast";

    var forecast = weather.list;
    for (let i = 5; i < forecast.length; i = i + 8) {
        var dailyForecast = forecast[i];
        console.log(forecast)
        
        var forecastEl = document.createElement('span')
        forecastEl.classList = "card-header p-3 text-center";
        

        var forecastDate = document.createElement('h5')
        forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
        forecastDate.classList = "w-list"
        forecastEl.appendChild(forecastDate)
        console.log(forecast)

        var weatherIcon = document.createElement('img');
        weatherIcon.classList = "w-list"
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}.png`)
        forecastEl.appendChild(weatherIcon)
        console.log(weatherIcon)

        var forecastTemp = document.createElement('span');
        forecastTemp.classList = "w-list";
        forecastTemp.textContent = "Temp: " + dailyForecast.main.temp + " °F";
        forecastEl.appendChild(forecastTemp);
        console.log(forecastTemp)

        var forecastWind = document.createElement("span")
       forecastWind.classList = "w-list";
       forecastWind.textContent = "Wind Speed: " + dailyForecast.wind.speed + " MPH";
       forecastEl.appendChild(forecastWind);
       console.log(forecastWind)

       var forecastHumid = document.createElement("span");
       forecastHumid.classList = "w-list";
       forecastHumid.textContent = "Humidity: " + dailyForecast.main.humidity + "  %";
       forecastEl.appendChild(forecastHumid);
       console.log(forecastHumid)

        futureSubList.appendChild(forecastEl)

    }

}

var pastCitySearch = function(pastSearch) {
    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "btn btn-primary my-3";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");
    pastSearchButtonEl.appendChild(pastSearchEl);
}

var pastSearchHistory = function (event) {
    var city = event.target.getAttribute("data-city")
    if(city){
        getWeather(city);
        get5Day(city);
    }
}



searchButton.addEventListener('click', getWeather);

// attempt to populate weather

