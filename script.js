var apiKey = "40d87041d57fdc78be226541ef53b536";
var lat = 39.7047
var lon = 105.0814
var city
// var searchInput = document.querySelector("#searchCity");
var searchInput = document.getElementById("searchCity")
var searchForm = document.getElementById("testing1")
city = searchInput.value.trim()

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

function cityInput(e) {
    e.preventDefault();
    var city = searchInput.value.trim();

    console.log(city)
    if (!city) {
        console.log("No input");
        return;
    }



    function getLatLon(city) {
        console.log(city, apiKey)
        var latLonApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
        console.log(latLonApi)
        fetch(latLonApi).then(function (res) {
            // console.log(res)
            return res.json()
        })
            .then(function (data) {
                console.log(data)
            })
    }
    getLatLon(city)
}


function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey

    fetch(weatherApi)
        .then(function (response) {/*once I've received data fire this function, which turns the information returned into "response" */
            // console.log(weatherApi)
            return response.json();
        })
        .then(function (data) {
            // console.log(data)
            //Loop over the data to generate a table, each table row will have a link to the repo url
            for (var i = 0; i < data.length; i++) {
                // Creating elements, tablerow, tabledata, and anchor
                var createTableRow = document.createElement('tr');
                var tableData = document.createElement('td');
                var link = document.createElement('a');

                // Setting the text of link and the href of the link
                link.textContent = data[i].html_url;
                link.href = data[i].html_url;

                // Appending the link to the tabledata and then appending the tabledata to the tablerow
                // The tablerow then gets appended to the tablebody
                tableData.appendChild(link);
                createTableRow.appendChild(tableData);
                tableBody.appendChild(createTableRow);
            }
        });
}

getApi()
var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
// console.log(weatherApi)

var latLonApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid" + apiKey
// console.log(latLonApi)



searchForm.addEventListener("click", cityInput);
