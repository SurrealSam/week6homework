var inputField = document.getElementById("cityName");

$("#searchBtn").click(function () {
    event.preventDefault();
    var title = inputField.value;
    console.log(title);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + title + "&appid=5b3efdfbee101e367fea7a4fc66bf73e";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
});

