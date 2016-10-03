$(document).ready(function () {
    var lat = 0;
    var lon = 0;
    var weather = "";
    $.getJSON("http://ip-api.com/json", function (json) {
        $("span#city").html(json.city);
        $("span#regName").html(json.regionName);
        lat = json.lat;
        lon = json.lon;

        $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=2ab409bee90888be82470cee6578966c", function (data) {
            //console.log(data);
            var tempF = data.main.temp * 9 / 5 - 459.67;
            tempF = Math.round(tempF);
            var tempC = data.main.temp - 273.15;
            tempC = Math.round(tempC);
            weather = data.weather[0].description;

            function capFirstLetter(weather) {
                return weather.charAt(0).toUpperCase() + weather.slice(1);
            }
            $("#convert").click(function () {
                if ($('#tempC').css('display') == 'none') {
                    $("#tempC").show();
                    $("#tempF").hide();
                } else if ($('#tempF').css('display') == 'none') {
                    $("#tempF").show();
                    $("#tempC").hide();
                }
            });
            $("p#tempF").html(tempF + "&deg; F");
            $("p#tempC").html(tempC + "&deg; C");
            $("p#weather").html(capFirstLetter(weather));
            $("p#wind").html("Wind speed " + data.wind.speed + "mph");
            $("p#humidity").html("Humidity " + data.main.humidity + "%");
            //data.weather[0].description = "mist";
            if (data.weather[0].description == "clear sky" || data.weather[0].description == "few clouds") {
                $("body").css("background-image", "url('https://crystalseye.files.wordpress.com/2011/08/dsc_0724.jpg')");
            } else if (data.weather[0].decscription == "rain" || data.weather[0].decscription == "shower rain") {
                $("body").css("background-image", "url('http://www.chillcover.com/wp-content/uploads/2015/03/Rain-Falling-From-The-Sky_HD_Images_chillcover.com_.jpg')");
            } else if (data.weather[0].description == "snow") {
                $("body").css("background-image", "url('http://img03.deviantart.net/e6a5/i/2006/317/a/f/one_snowy_night_by_tofubunny.jpg')");
            } else if (data.weather[0].description == "scattered clouds" || data.weather[0].description == "broken clouds") {
                $("body").css("background-image", "url('https://c2.staticflickr.com/6/5203/5321521513_bc0e250827_b.jpg')");
            } else if (data.weather[0].description == "thunderstorm") {
                $("body").css("background-image", "url('http://cdn.c.photoshelter.com/img-get/I0000VaA6yErKf8k/s/860/688/wsi-stm038.jpg')");
            } else if (data.weather[0].description == "mist") {
                $("body").css("background-image", "url('http://dpshots.com/images/mist_photography/water-mist.jpg')");
            }
        });
    });
});
