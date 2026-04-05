async function getAdvice() {
  const crop = document.getElementById("crop").value;
  const soil = document.getElementById("soil").value;

  const weather = { temp: 36, rain: 0 };

  const res = await fetch("/api/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ crop, soil, weather })
  });

  const data = await res.json();
  document.getElementById("output").innerText = data.advice.join("\n");
}

async function getWeather() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const res = await fetch(`/api/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
    const data = await res.json();

    document.getElementById("weather").innerText =
      `${data.main.temp}°C - ${data.weather[0].description}`;
  });
}

async function detectDisease() {
  const res = await fetch("/api/disease", { method: "POST" });
  const data = await res.json();

  document.getElementById("disease").innerText =
    `${data.name} → ${data.treatment}`;
}

async function getMarket() {
  const res = await fetch("/api/market");
  const data = await res.json();

  const list = document.getElementById("market");
  list.innerHTML = "";

  data.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.crop}: ${item.price}`;
    list.appendChild(li);
  });
}