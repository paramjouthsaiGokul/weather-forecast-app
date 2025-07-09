function attachWeatherHandler() {
  document.getElementById("getWeatherBtn").addEventListener("click", getWeather);
}

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "08840b4f7cdf893fe4a5ffa0504c79a0";

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},in&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (!data || data.cod !== 200) {
      document.getElementById("weatherResult").innerHTML = `
        <p style="color: red;">❌ City not found. Try a different name.</p>
      `;
      return;
    }

    const { name } = data;
    const { temp, humidity } = data.main;
    const weather = data.weather[0].description;
    const icon = data.weather[0].icon;
    const wind = data.wind.speed;

    const now = new Date();
    const hours = now.getHours();
    let greeting = "Hello";
    if (hours >= 4 && hours < 12) {
      greeting = "Good morning";
    } else if (hours >= 12 && hours < 16) {
      greeting = "Good afternoon";
    } else if (hours >= 16 && hours < 23) {
      greeting = "Good evening";
    }

    document.getElementById("weatherResult").innerHTML = `
      <p><strong>${greeting}, ${name}!</strong></p>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
      <p>🌡 Temperature: ${temp} °C</p>
      <p>🌧 Weather: ${weather}</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>🌬 Wind Speed: ${wind} m/s</p>
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerText = "⚠️ Error fetching weather data.";
  }
}

window.onload = attachWeatherHandler;
