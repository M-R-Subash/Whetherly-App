import React from "react";

export default function UserProfile({ user, onUpdate }) {
  if (!user) return null;
  return (
    <div className="glass p-4 rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-white">{user.username}</div>
          <div className="text-xs text-slate-400">Local demo profile</div>
        </div>
        <div className="text-sm text-slate-300">Bookmarks: {user.bookmarks?.length || 0}</div>
      </div>

    </div>
  );
}
