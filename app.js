const API_KEY = "06081a32f6e5b116de9f067939e5e523";

const contentDiv = document.getElementById("api-content");
const cityInput = document.getElementById("city-input");
const weatherForm = document.querySelector("form");
const farenheitInput = document.getElementById("farenheit-input");
const celsiusInput = document.getElementById("celsius-input");

weatherForm.addEventListener("submit", onSubmit);

async function handleAPI() {
    try{
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${checkTempUnits()}&appid=${API_KEY}`);
        const weatherData = await response.json();
        showWeather(weatherData);  
        console.log(weatherData);
     } catch(err) {
        console.log(err);
        alert("Please enter a city name");
    }
}

function showWeather(data) {
    const newDiv = document.createElement("div")
    newDiv.classList.add("contentDiv");

    const cityP = document.createElement("p");
    cityP.innerText = capitalizeCity(cityInput.value);

    const tempP = document.createElement("p");
    tempP.innerText = "Temp: " + data.main.temp + "°";

    const tempFeelsLike = document.createElement("p");
    tempFeelsLike.innerText = "Feels like: " + data.main.feels_like + "°";
    
    const descriptionP = document.createElement("p");
    descriptionP.innerText = data.weather[0].description;

    newDiv.append(cityP);
    newDiv.append(tempP);
    newDiv.append(tempFeelsLike);
    newDiv.append(descriptionP);
    
    contentDiv.append(newDiv);
}

function checkTempUnits() {
    let units;
    if (farenheitInput.checked == true) {
        units = "imperial";
    } else if (celsiusInput.checked == true) {
        units = "metric";
    } else {
        units = "";
    }

    return units;
}

// function to clear form inputs
function clearInput() {
    cityInput.value = "";
}

function capitalizeCity(city) {
  const words = city.split(" ");
  return words.map((word) => {
      return word[0].toUpperCase() + word.substring(1);
  }).join(" ");
}

function onSubmit(e) {
    handleAPI();
    e.preventDefault();
    // cityInput.value = "";
}


