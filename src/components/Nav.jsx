import React from "react";

export default function Nav({ user, onLogout }) {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 glass rounded-b-md">
      <h1 className="text-lg font-semibold text-white">Weatherly</h1>

      <div className="flex items-center gap-4">
        <div className="text-sm text-slate-300 hidden md:block">Real-time weather — search & save locations</div>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-200">{user.username}</span>
            <button
              onClick={onLogout}
              className="px-3 py-1 rounded-md text-sm border border-white/6 hover:bg-white/2"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-sm text-slate-400">Please sign in</div>
        )}
      </div>
    </nav>
  );
}
