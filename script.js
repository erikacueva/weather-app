$(document).ready(function () {
  // when user enters city information into the input box and clicks submit
  var cityInput = document.getElementById("city");
  var city = "";
  document.querySelector("#citySubmitButton").onclick = function (event) {
    //   prevent default beahvior of form
    event.preventDefault();
    city = cityInput.value;
    console.log(city);

    var currentData =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=9aef3a1366ac2f774ab80c44e3b4e8cd";

    $.ajax({
      url: currentData,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $("#currentSearch").text(response.name);
    });

    var forecast =
      "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
      city +
      "&appid=9aef3a1366ac2f774ab80c44e3b4e8cd";
  };

  // pull the value from the input box
  // run an AJAX call
  // then the api calls the forecast info
  // instruct the page to display info
  // displays the information
  // the site saves searched city names
  // the city names should be clickable and show the forecast info
  var currentData =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=9aef3a1366ac2f774ab80c44e3b4e8cd";

  var forecast =
    "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
    city +
    "&appid=9aef3a1366ac2f774ab80c44e3b4e8cd";
});
