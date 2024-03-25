var search = document.getElementById('search');
var input = document.getElementById('input');
var para = document.getElementById('result');
var lochead = document.getElementById('lochead');
search.addEventListener('click', getRegion);

function getRegion() {
    var location = input.value.trim(); 
    lochead.innerText = "";
    if(location == 2048){
        window.open("https://pixelrick420.github.io/2048/");
        return;
    }
    else if(location.toUpperCase() === "german".toUpperCase()){
        window.open("https://pixelrick420.github.io/German-Colours/");
        return;
    }
    else if (location === '') {
        para.innerText = "Please enter a location.";
        return;
    }
    else{
        var api_link = `http://api.weatherapi.com/v1/current.json?key=c74290ef12984eb39a2112628240703&q=${location}&aqi=no`;
    
        fetch(api_link)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                lochead.innerText = "Weather in " + location;
                para.innerText = 
                    "Temperature : " + data.current.temp_c + "°C" +
                    "\n Condition : " + data.current.condition.text +
                    "\n Humidity : " + data.current.humidity + " percent" +
                    "\n Wind : " + data.current.wind_kph + " km/h";
            })
            .catch(error => {
                console.log(error);
                para.innerText = "Could not find weather data";
            });
        }   
}
