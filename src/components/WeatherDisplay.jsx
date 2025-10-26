import React from "react";

function WeatherRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm  text-slate-300">
      <span>{label}</span>
      <span className="font-medium text-slate-100">{value}</span>
    </div>
  );
}

export default function WeatherDisplay({ data, onSave, isSaved }) {
  if (!data) return null;

  const { name, sys, weather, main, wind } = data;
  const w = weather && weather[0];

  return (
    <div className="glass p-4 rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">{name}, {sys?.country}</div>
          <div className="text-sm text-slate-400">{w?.description}</div>
        </div>

        <div className="text-4xl font-bold">
          {Math.round(main?.temp)}°C
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <WeatherRow label="Feels like" value={`${Math.round(main?.feels_like)}°C`} />
        <WeatherRow label="Humidity" value={`${main?.humidity}%`} />
        <WeatherRow label="Wind" value={`${wind?.speed} m/s`} />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onSave}
          className={`px-3 py-2 rounded-md text-sm ${isSaved ? "bg-accent2 text-black" : "bg-transparent border border-white/6"}`}
        >
          {isSaved ? "Saved" : "Save location"}
        </button>
      </div>
    </div>
  );
}
