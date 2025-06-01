document.getElementById("searchBtn").addEventListener("click", async (event) => {
    event.preventDefault(); 

    let city = document.getElementById("searchCity").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    let apiKey = "712dd36a7a77bdeaf53b4a7e5a754d11";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("City not found. Please try again.");
        let data = await response.json();
        
        displayWeather(data);
    } catch (error) {
        document.getElementById("weatherDisplay").innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
});

function displayWeather(data) {
    let iconCode = data.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById("weatherDisplay").innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <img src="${iconUrl}" alt="Weather Icon">
    `;
}
