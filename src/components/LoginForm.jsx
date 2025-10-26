import React, { useState } from "react";

/**
 * Simple localStorage-based auth for demo purposes.
 * Stores users as: { username: string, password: string, bookmarks: [] }
 */
export default function LoginForm({ onLogin }) {
  const [mode, setMode] = useState("login"); // or 'signup'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  function loadUsers() {
    try {
      return JSON.parse(localStorage.getItem("weatherly_users") || "[]");
    } catch { return []; }
  }

  function saveUsers(users) {
    localStorage.setItem("weatherly_users", JSON.stringify(users));
  }

  const handleSignup = () => {
    setErr("");
    if (!username.trim() || !password.trim()) return setErr("Missing fields");
    const users = loadUsers();
    if (users.find(u => u.username === username)) return setErr("Username exists");
    const user = { username, password, bookmarks: [] };
    users.push(user);
    saveUsers(users);
    onLogin(user);
  };

  const handleLogin = () => {
    setErr("");
    const users = loadUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return setErr("Invalid credentials");
    onLogin(user);
  };

  return (
    <div className="glass p-4 rounded-md w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-3">{mode === "login" ? "Login" : "Sign Up"}</h3>
      <div className="flex flex-col gap-2">
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="px-3 py-2 rounded-md bg-white/5 border border-white/6" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="px-3 py-2 rounded-md bg-white/5 border border-white/6" />
        {err && <div className="text-red-400 text-sm">{err}</div>}

        {mode === "login" ? (
          <div className="flex gap-2">
            <button onClick={handleLogin} className="px-3 py-2 rounded-md bg-accent text-black">Login</button>
            <button onClick={() => setMode("signup")} className="px-3 py-2 rounded-md border border-white/6">Sign up</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleSignup} className="px-3 py-2 rounded-md bg-accent text-black">Create account</button>
            <button onClick={() => setMode("login")} className="px-3 py-2 rounded-md border border-white/6">Back</button>
          </div>
        )}
      </div>
    </div>
  );
}
