import React, { useState } from "react";

export default function SearchBar({ onSearch, onUseGeolocation }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch(q.trim());
    setQ("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        aria-label="Search city"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search city (e.g., London)"
        className="flex-1 px-3 py-2 rounded-md bg-white/5 border border-white/6 placeholder:text-slate-400 focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 rounded-md bg-accent text-black font-medium">
        Search
      </button>
      <button type="button" onClick={onUseGeolocation} className="px-3 py-2 rounded-md border border-white/6">
        My Location
      </button>
    </form>
  );
}
