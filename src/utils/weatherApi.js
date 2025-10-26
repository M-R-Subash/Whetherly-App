const API_KEY = process.env.REACT_APP_OWM_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";

function handleFetch(url) {
  return fetch(url).then(async res => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `HTTP ${res.status}`);
    }
    return res.json();
  });
}


export function fetchCurrentByCity(city) {
  const url = `${BASE}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  return handleFetch(url);
}


export function fetchForecastByCity(city) {
  const url = `${BASE}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  return handleFetch(url);
}


export function fetchCurrentByCoords(lat, lon) {
  const url = `${BASE}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  return handleFetch(url);
}
