//Declare a variable to store the searched city
var city = "";
// variable declarations
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var currentCity = $("#current-city");
var currentTemp = $("#temperature");
var currentHumidity = $("#humidity");
var currentWind = $("#wind-speed");



var APIkey = "9aef3a1366ac2f774ab80c44e3b4e8cd";

// check for existing cities in local storage
function find(c) {
  for (var i = 0; i < cityArray.length; i++) {
    if (c.toUpperCase() === cityArray[i]) {
      return -1;
    }
  }
  return 1;
}

// display the forceast
function displayWeather(event) {
  event.preventDefault();
  if (searchCity.val().trim() !== "") {
    city = searchCity.val().trim();
    currentWeather(city);
  }
}

var cityArray = [];
// AJAX call
function currentWeather(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIkey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var weatherIcon = response.weather[0].icon;
    var iconURL =
      "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    var date = new Date(response.dt*1000).toDateString();
  
    // concatinate the date and icon
    $(currentCity).html(
      response.name + "(" + date + ")" + "<img src=" + iconURL + ">"
    );
    var temp = (response.main.temp - 273.15) * 1.8 + 32;
    // display the temp with the Farenheit symbol
    $(currentTemp).html(temp.toFixed(2) + "&#8457");
    $(currentHumidity).html(response.main.humidity + "%");
    var w = response.wind.speed;
    var wind = (w * 2.237).toFixed(1);
    $(currentWind).html(wind + "MPH");
    UV(response.coord.lon, response.coord.lat);
    fiveDayForecast(response.id);
    if (response.cod == 200) {
      cityArray=JSON.parse(localStorage.getItem("cityname"));
      console.log(cityArray);
      if (cityArray == null) {
        cityArray = [];
        cityArray.push(city.toUpperCase()
        );
        localStorage.setItem("cityname", JSON.stringify(cityArray));
        find(city);
      }
      else {
        if(find(city)>0) {
          cityArray.push(city.toUpperCase());
          localStorage.setItem("cityname",JSON.stringify(cityArray));
          find(city);
        }
      }
    }
  });
}

var uvIndex = $("#uv-index");
// function to return uv index
function UV(ln, lt){
  var uvAPI="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIkey+"&lat="+lt+"&lon="+ln;
  $.ajax({
    url: uvAPI,
    method:"GET"
  }).then(function(response){
    $(uvIndex).html(response.value);
  });
}

function fiveDayForecast(id){
  var endofday = false;
  var forecastURL="https://api.openweathermap.org/data/2.5/forecast?id="+id+"&appid="+APIkey;
  $.ajax({
    url:forecastURL,
    method:"GET"
  }).then(function(response){
    for (i=0; i<5;i++) {
      var day = new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
      var codeicon= response.list[((i+1)*8)-1].weather[0].icon;
      var iconurl="https://openweathermap.org/img/wn/"+codeicon+".png";
      var responsetemp= response.list[((i+1)*8)-1].main.temp;
      var temptoF=(((responsetemp-273.5)*1.80)+32).toFixed(2);
      var humidity= response.list[((i+1)*8)-1].main.humidity;

      $("#dateforecast"+i).html(day);
      $("#imageforecast"+i).html("<img src="+iconurl+">");
      $("#forecasttemp"+i).html(temptoF+"&#8457");
      $("#forecastHum"+i).html(humidity+"%");
    }
  });
}

// past city searches
function cityHistory(event){
  var pastsearch=event.target;
  if (event.target.matches("li")){
      city=pastsearch.textContent.trim();
      currentWeather(city);
  }
}

// display each city 
function loadCities(){
  $("ul").empty();
  var cityArray = JSON.parse(localStorage.getItem("cityname"));
  if(cityArray!==null){
      cityArray=JSON.parse(localStorage.getItem("cityname"));
      for(i=0; i<cityArray.length;i++){
          find(cityArray[i]);
      }
      city=cityArray[i-1];
      currentWeather(city);
  }

}

function clearSearch(event){
  event.preventDefault();
  cityArray=[];
  localStorage.removeItem("cityname");
  document.location.reload();

}
//Click Handlers
$("#search-button").on("click",displayWeather);
$(document).on("click",cityHistory);
$(window).on("load",loadCities);
$("#clear-history").on("click",clearSearch);

// first attempt
// // when user enters city information into the input box and clicks submit
// var cityInput = document.getElementById("city");
// var city = "";
// document.querySelector("#citySubmitButton").onclick = function (event) {
//   //   prevent default beahvior of form
//   event.preventDefault();
//   city = cityInput.value;
//   console.log(city);

//   var currentData =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     city +
//     "&appid=9aef3a1366ac2f774ab80c44e3b4e8cd";

//   $.ajax({
//     url: currentData,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response);
//     $("#currentSearch").text(response.name);
//   });

//   var forecast =
//     "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
//     city +
//     "&appid=9aef3a1366ac2f774ab80c44e3b4e8cd";

//   $.ajax({
//     url: forecast,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response);
//     $("#forecast").text(response.name);
//   });
// };

// // pull the value from the input box
// // run an AJAX call
// // then the api calls the forecast info
// // instruct the page to display info
// // displays the information
// // the site saves searched city names
// // the city names should be clickable and show the forecast info
// var currentData =
//   "https://api.openweathermap.org/data/2.5/weather?q=" +
//   city +
//   "&appid=9aef3a1366ac2f774ab80c44e3b4e8cd";

// var forecast =
//   "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
//   city +
//   "&appid=9aef3a1366ac2f774ab80c44e3b4e8cd";
