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
    searchedCity.appendChild(searchedCities);
    $('input[name="searchCity"]').val('');
    getApi()
    let currentSearch = document.getElementById("currentSearch");
    currentSearch.innerHTML = city;
    let local = JSON.parse(localStorage.getItem("city") || "[]");
    local.push(city);
    localStorage.setItem("city", JSON.stringify(local));

    function getApi() {
        let weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
        console.log(weatherApi);
        fetch(weatherApi)
            .then(function (response) {
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
                let iconImg = document.getElementById("currentIcon");
                iconImg.src = iconUrl;
                for (let i = 7; i <= 40; i += 8) {
                    let temp = document.createElement("div");
                    temp.innerHTML = "Temperature: " + data.list[i].main.temp;
                    document.querySelector(".fiveDay").appendChild(temp)
                    let wind = document.createElement("div");
                    wind.innerHTML = "Wind speed: " + data.list[i].wind.speed;
                    document.querySelector(".fiveDay").appendChild(wind)
                    let humidity = document.createElement("div");
                    humidity.innerHTML = "Humidity: " + data.list[i].main.humidity;
                    document.querySelector(".fiveDay").appendChild(humidity)
                    let icon = data.list[i].weather[0].icon;
                    // console.log(icon, "hello")
                    let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
                    let iconImg = document.createElement("img");
                    iconImg.src = iconUrl
                    document.querySelector(".fiveDay").appendChild(iconImg)

                    $('input[name="searchCity"]').val('');
                    ;
                }
            })
    }
    searchedCities.addEventListener("click", getApi)

}




submit.addEventListener("click", cityInput)
// getApi()



// searchForm.addEventListener("click", cityInput);
