import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import SavedLocations from "./components/SavedLocations";
import LoginForm from "./components/LoginForm";
import UserProfile from "./components/UserProfile";
import { fetchCurrentByCity, fetchCurrentByCoords } from "./utils/weatherApi";

function keyForLocation(data) {
  if (!data) return null;
  const name = data.name || data?.city || "unknown";
  const country = data.sys?.country || data.country || "";
  const lat = data.coord?.lat ? Math.round(data.coord.lat * 1000) : "";
  const lon = data.coord?.lon ? Math.round(data.coord.lon * 1000) : "";
  return `${name}-${country}-${lat}-${lon}`;
}

function loadCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("weatherly_current")) || null;
  } catch { return null; }
}

function saveCurrentUser(user) {
  localStorage.setItem("weatherly_current", JSON.stringify(user));
}

function saveUserToStore(user) {
  try {
    const users = JSON.parse(localStorage.getItem("weatherly_users") || "[]");
    const idx = users.findIndex(u => u.username === user.username);
    if (idx > -1) users[idx] = user;
    else users.push(user);
    localStorage.setItem("weatherly_users", JSON.stringify(users));
  } catch (e) { /* ignore */ }
}

export default function App() {
  const [user, setUser] = useState(loadCurrentUser());
  const [currentWeather, setCurrentWeather] = useState(null);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) {
      setSaved(user.bookmarks || []);
    } else {
      setSaved([]);
    }
  }, [user]);

  useEffect(() => {
    saveCurrentUser(user);
  }, [user]);

  const handleLogin = (u) => {
    setUser(u);
    setSaved(u.bookmarks || []);
    saveCurrentUser(u);
  };

  const handleLogout = () => {
    setUser(null);
    saveCurrentUser(null);
    setMsg("Logged out");
    setTimeout(() => setMsg(""), 2000);
  };

  async function doSearch(city) {
    setLoading(true);
    setMsg("");
    try {
      const data = await fetchCurrentByCity(city);
      setCurrentWeather(data);
    } catch (err) {
      console.error(err);
      setMsg("City not found or API error");
      setCurrentWeather(null);
    } finally {
      setLoading(false);
      setTimeout(()=>setMsg(""), 3000);
    }
  }

  async function useGeolocation() {
    if (!navigator.geolocation) {
      setMsg("Geolocation not supported");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const data = await fetchCurrentByCoords(latitude, longitude);
        setCurrentWeather(data);
      } catch (err) {
        setMsg("Unable to fetch location weather");
      } finally {
        setLoading(false);
        setTimeout(()=>setMsg(""), 3000);
      }
    }, () => {
      setMsg("Location permission denied");
      setLoading(false);
      setTimeout(()=>setMsg(""), 3000);
    });
  }

  function saveLocation() {
    if (!currentWeather || !user) {
      setMsg(user ? "No city to save" : "Please sign in to save locations");
      setTimeout(()=>setMsg(""), 2500);
      return;
    }
    const loc = {
      key: keyForLocation(currentWeather),
      name: currentWeather.name,
      country: currentWeather.sys?.country,
      data: currentWeather
    };

    if (saved.find(s => s.key === loc.key)) {
      setMsg("Already saved");
      setTimeout(()=>setMsg(""), 1600);
      return;
    }
    const next = [loc, ...saved];
    setSaved(next);

    const newUser = { ...user, bookmarks: next };
    setUser(newUser);
    saveUserToStore(newUser);
    setMsg("Saved");
    setTimeout(()=>setMsg(""), 1200);
  }

  function removeSaved(loc) {
    const next = saved.filter(s => s.key !== loc.key);
    setSaved(next);
    if (user) {
      const newUser = { ...user, bookmarks: next };
      setUser(newUser);
      saveUserToStore(newUser);
    }
  }

  async function selectSaved(loc) {
    setLoading(true);
    try {
      const fresh = await fetchCurrentByCity(loc.name);
      setCurrentWeather(fresh);
    } catch (err) {
      setCurrentWeather(loc.data || null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav user={user} onLogout={handleLogout} />

      <main className="max-w-5xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="glass p-4 rounded-md">
            <SearchBar onSearch={doSearch} onUseGeolocation={useGeolocation} />
            {msg && <div className="mt-3 text-sm text-rose-400">{msg}</div>}
          </div>

          <div className="glass p-4 rounded-md">
            <h3 className="text-sm font-semibold mb-2">Saved Locations</h3>
            <SavedLocations saved={saved} onSelect={selectSaved} onRemove={removeSaved} />
          </div>

          <div className="glass p-4 rounded-md">
            <h3 className="text-sm font-semibold mb-2">Profile</h3>
            {user ? (
              <UserProfile user={user} />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="glass p-4 rounded-md min-h-[220px]">
            {loading ? (
              <div className="text-slate-400">Loading...</div>
            ) : (
              <>
                <WeatherDisplay data={currentWeather} onSave={saveLocation} isSaved={currentWeather && saved.some(s => s.key === keyForLocation(currentWeather))} />
                {!currentWeather && <div className="text-slate-400 mt-4">Search for a city to view current weather.</div>}
              </>
            )}
          </div>

          <div className="glass p-4 rounded-md text-sm">
            Tip: Connect your LinkedIn and GitHub in the README and share the deployed link — employers notice polished small projects.
          </div>
        </div>
      </main>
    </div>
  );
}
