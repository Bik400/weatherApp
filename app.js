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
     } catch(err) {
        console.log(err);
        alert("Please enter a city name");
    }
}

function something() {
    console.log("i clicked the delete button");
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

    const deleteEntry = document.createElement("button");
    deleteEntry.innerHTML = "<i class='fas fa-trash'></i>";
    deleteEntry.classList.add("delete-btn");
    deleteEntry.addEventListener("click", deleteEntryValue);

    newDiv.append(cityP);
    newDiv.append(tempP);
    newDiv.append(tempFeelsLike);
    newDiv.append(descriptionP);
    newDiv.append(deleteEntry);
    
    contentDiv.append(newDiv);
}

function deleteEntryValue(e) {
    item = e.target;
    if (item.classList.contains("delete-btn")) {
        const entryValue = item.parentElement;
        entryValue.remove();
    }
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

function capitalizeCity(city) {
  const words = city.split(" ");
  return words.map((word) => {
      return word[0].toUpperCase() + word.substring(1);
  }).join(" ");
}

function onSubmit(e) {
    handleAPI();
    e.preventDefault();
}


