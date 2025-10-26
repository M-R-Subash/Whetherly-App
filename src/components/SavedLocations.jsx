import React from "react";

export default function SavedLocations({ saved, onSelect, onRemove }) {
  if (!saved || saved.length === 0) return (
    <div className="text-sm text-slate-400">No saved locations yet.</div>
  );

  return (
    <div className="space-y-2">
      {saved.map(loc => (
        <div key={loc.key} className="flex items-center justify-between glass p-2 rounded-md">
          <div className="cursor-pointer" onClick={() => onSelect(loc)}>
            <div className="font-medium">{loc.name}</div>
            <div className="text-xs text-slate-400">{loc.country || ""}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onSelect(loc)} className="px-2 py-1 rounded-md border border-white/6 text-sm">View</button>
            <button onClick={() => onRemove(loc)} className="px-2 py-1 rounded-md border border-red-500 text-sm text-red-400">Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
