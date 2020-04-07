var inputField = document.getElementById("cityName");

$("#searchBtn").click(function () {
    event.preventDefault();
    citySearch(inputField.value);
    storeCity(inputField.value);
});

$("#dropdownMenuButton").click(function () {
    event.preventDefault();

    var i;
    for (i = 5; i > 0; i--) {
        console.log(i);
        var ddNumber = "#dd" + i;
        var ddString = ddNumber.toString();

        var iString = i.toString();
        var cityName = localStorage.getItem(iString);
        console.log(cityName);

        $(ddString).html(cityName);
    }
});

$(".dropdown-item").click(function () {
    console.log(this.text);
    citySearch(this.text);
})

function storeCity(title) {
    if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount) + 1;
        if (localStorage.clickcount > 5) {
            localStorage.clickcount = 1;
        }
    } else {
        localStorage.clickcount = 1;
    }
    var clicks = (localStorage.clickcount).toString();

    localStorage.setItem(clicks, title);
};

function citySearch(title) {

    console.log(title);
    //had to prepend herokuapp to get rid of error message
    var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + title + "&cnt=5&appid=5b3efdfbee101e367fea7a4fc66bf73e";

    var capTitle = title.toString().charAt(0).toUpperCase() + title.toString().slice(1)
    $("#citynameheader").text("5 Day Forecast for: " + capTitle);

    $.ajax({
        dataType: "json",
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.list[0]);
        console.log(response.list[0].weather[0].main);


        var i;
        for (i = 0; i < 5; i++) {


            var condition = response.list[i].weather[0].main;
            var cardNumber = "#card" + (i + 1);
            var cardString = cardNumber.toString();

            var textNumber = "#text" + (i + 1);
            var dayNumber = "#day" + (i + 1);

            var temp = Math.round((response.list[i].main.temp - 273.16) * 1.8 + 32);
            console.log(temp);

            var humidity = response.list[i].main.humidity;
            var windkm = response.list[i].wind.speed;
            var wind = Math.round(windkm * 0.62);


            $(dayNumber).attr('style', 'display: block');

            $(textNumber).html("<ul>\
                <li>" + condition + "</li>\
                <li>Temperature: " + temp + " F </li>\
                <li>Wind Speed: " + wind + " mph</li>\
                <li>Humidity: " + humidity + "%</li>\
              </ul>");

            if (condition === "Clear") {
                $(cardString).attr("src", "https://freesvg.org/img/sivvus_weather_symbols_1.png");
            }
            else if (condition === "Thunderstorm") {
                $(cardString).attr("src", "https://lh3.googleusercontent.com/proxy/8e1t4zKFDIB46PDjmeV_fjR1fWbIema5YNi7cAw00neEm_yG_t1cQDVkDa6COfC8sHuTYPKwHW_T4uieiWnQTBU1PIb1SKwPCsNU9wvEK6ywPzVSn4sCdBueQu_FQJdRelsH0zOogcMA6tVaDGyviQ");

            }
            else if (condition === "Drizzle") {
                $(cardString).attr("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ01E6oaegsnPkge9vNuw0McLg3VPAGARNp6AvbJ_zC_hqnEOG");

            }
            else if (condition === "Rain") {
                $(cardString).attr("src", "https://www.freeiconspng.com/uploads/rain-cloud-icon-28.png");

            }
            else if (condition === "Snow") {
                $(cardString).attr("src", "https://previews.123rf.com/images/kednert/kednert1110/kednert111000023/11038216-weather-snow-cloud-symbol-blue-color.jpg");

            }
            else if (condition === "Clouds") {
                $(cardString).attr("src", "https://cdn1.iconfinder.com/data/icons/hawcons/32/700281-icon-40-clouds-512.png");

            }


        }

        var lat = response.city.coord.lat;
        console.log(lat);
        var lon = response.city.coord.lon;
        console.log(lon);

        var uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?&lat=" + lat + "&lon=" + lon + "&cnt=4&appid=5b3efdfbee101e367fea7a4fc66bf73e";
        $.ajax({
            dataType: "json",
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var i;
            for (i = 0; i < 5; i++) {

                var textNumber = "#text" + (i + 1);
                var uvIndex = Math.round(response[i].value);
                console.log(uvIndex);

                $(textNumber).append("<ul>\
                <li>UV Index: " + uvIndex + "</li>\
              </ul>");
            }

        })


    })
};