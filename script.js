const apiKey = "40d87041d57fdc78be226541ef53b536";
let city = "";
let searchInput = document.getElementById("searchCity");
let submit = document.getElementById("submit");
let currentDate = dayjs().format('MM/DD/YYYY');


// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


// city.addEventListener("click",{
//     city = document.getElementById("#searchCity")
// })

function cityInput(event) {
    event.preventDefault();
    let city = document.getElementById("searchCity").value;
    let searchedCity = document.getElementById("searchHistory");
    let searchedCities = document.createElement("button");
    searchedCities.innerHTML = city;
    console.log(searchedCity, city);
    // searchedCities.innerText=city;
    console.log(searchedCities)
    searchedCity.appendChild(searchedCities);
    $('input[name="searchCity"]').val('');
    getApi()
    let currentSearch = document.getElementById("currentSearch");
    currentSearch.innerHTML = city;
    let local = JSON.parse(localStorage.getItem("city") || "[]");
    local.push(city);
    localStorage.setItem("city", JSON.stringify(local));
    getFiveDay();

    function getApi() {
        let weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
        console.log(weatherApi);
        fetch(weatherApi)
            .then(function (response) {/*once I've received data fire this function, which turns the information returned into "response" */
                return response.json();
            })
            .then(function (data) {
                let today = document.getElementById("currentDate");
                console.log(data)
                today.innerHTML = currentDate;
                let temp = document.getElementById("currentTemp");
                temp.innerHTML = data.list[0].main.temp;
                let wind = document.getElementById("currentWind");
                wind.innerHTML = data.list[0].wind.speed;
                let humidity = document.getElementById("currentHumidity");
                humidity.innerHTML = data.list[0].main.humidity;
                let icon = data.list[0].weather[0].icon;
                console.log(icon, "hello")
                let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png` 
                let iconImg = document.createElement("img");
                iconImg.src = iconUrl
                document.getElementById("currentIcon").appendChild(iconImg)


            });

        $('input[name="searchCity"]').val('');
    }
    function getFiveDay() {
        let fiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
        let fiveDayArray = [""];
        let length = 41;
        fetch(fiveDay)
            .then(function (response) {/*once I've received data fire this function, which turns the information returned into "response" */
                return response.json();
            })
            .then(function (data) {
                for (let i = 8; i < length; i + 8) {
                    // let firstForecast = document.querySelector("fiveDay");
                    // firstForecast = document.createElement('div');
                    // let temp = document.getElementById("currentTemp");
                    // temp.innerHTML = data.list[0].main.temp;
                    // let wind = document.getElementById("currentWind");
                    // wind.innerHTML = data.list[0].wind.speed;
                    // let humidity = document.getElementById("currentHumidity");
                    // humidity.innerHTML = data.list[0].main.humidity;
                    // let icon = data.list[0].weather[0].icon;
                    // console.log(icon, "hello");
                    // let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png` 
                    // let iconImg = document.createElement("img");
                    // iconImg.src = iconUrl
                    // document.getElementById("currentIcon").appendChild(iconImg)
                    let temp = document.getElementById("testTemp");
                    temp.innerHTML = data.list[i].main.temp;
                    let wind = document.getElementById("testWind");
                    wind.innerHTML = data.list[i].wind.speed;
                    let humidity = document.getElementById("testHumidity");
                    humidity.innerHTML = data.list[i].main.humidity;
                    let icon = data.list[i].weather[0].icon;
                    console.log(icon, "hello")
                    let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png` 
                    let iconImg = document.createElement("img");
                    iconImg.src = iconUrl
                    document.getElementById("testIcon").appendChild(iconImg)
                    return;

                }

            })
    }

}

submit.addEventListener("click", cityInput)
// getApi()



// searchForm.addEventListener("click", cityInput);
