var inputField = document.getElementById("cityName");

$("#searchBtn").click(function () {
    event.preventDefault();
    var title = inputField.value;
    console.log(title);
    //had to prepend herokuapp to get rid of error message
    var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + title + "&appid=5b3efdfbee101e367fea7a4fc66bf73e";

    $.ajax({
        dataType: "json",
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
});

