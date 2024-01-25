const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0f8cbc6f84mshc4b9adb17438966p1bbc68jsnca44088aaf86",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};
const getWeather = (city)=>{
    cityName.innerHTML = city
    fetch("https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city, options)
    .then(response => response.json())
    .then((response) => {
        console.log(response)
        console.log(response.cloud_pct)

        cloud_pct.innerHTML = response.cloud_pct
        temp.innerHTML = response.temp
        feels_like.innerHTML = response.feels_like
        humidity.innerHTML = response.humidity
        humidity2.innerHTML = response.humidity
        min_temp.innerHTML = response.min_temp
        max_temp.innerHTML = response.max_temp
        wind_speed.innerHTML = response.wind_speed
        wind_speed2.innerHTML = response.wind_speed
        wind_degrees.innerHTML = response.wind_degrees
        
        const date = new Date(response.sunrise * 1000)
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        sunrise_time = `${hours}:${minutes}:${seconds}`;
        const date2 = new Date(response.sunset * 1000)
        const hours2 = date2.getHours().toString().padStart(2, '0');
        const minutes2 = date2.getMinutes().toString().padStart(2, '0');
        const seconds2 = date2.getSeconds().toString().padStart(2, '0');
        sunset_time = `${hours2}:${minutes2}:${seconds2}`;
        sunrise.innerHTML = sunrise_time
        sunset.innerHTML = sunset_time
    })
    .catch((err) => console.log(err));
}

submit.addEventListener("click", (e)=>{
    e.preventDefault()
    getWeather(city.value)
})

getWeather("Delhi")

cities = ["Cologne", "Frankfurt", "Berlin", "Amsterdam", "Hamburg"];

const updateWeatherForCities = () => {
    cities.forEach(city => {
      fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options)
        .then(response => response.json())
        .then(data => {
          // Update table row with the fetched weather data
          updateTableRow(city, data);
        })
        .catch(error => {
          console.error(`Error fetching weather data for ${city}:`, error);
        });
    });
};

const updateTableRow = (city, data) => {
    const row = document.querySelector(`tr[data-city="${city}"]`);
    if (row && data) {
      row.innerHTML = `
        <th scope="row" class="text-start">${city}</th>
        <td>${data.temp}<span>&#8451;</span></td>
        <td>${data.feels_like}<span>&#8451;</span></td>
        <td>${data.max_temp}<span>&#8451;</span></td>
        <td>${data.min_temp}<span>&#8451;</span></td>
        <td>${data.humidity} %</td>
        <td>${data.wind_speed} km/hr</td>
        <td>${data.wind_degrees}&deg;</td>
        <td>${data.cloud_pct} %</td>
      `;
    }
  };

  updateWeatherForCities();

