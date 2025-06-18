import React, { useState } from "react";

const suggestions = [
  {
    name: "Julia Smith",
    username: "@juliasmith",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Vermillion D. Gray",
    username: "@vermilliongray",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Mai Senpai",
    username: "@maisenpai",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    name: "Azunyan U. Wu",
    username: "@azunyandesu",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Oarack Babama",
    username: "@obama2l",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

export default function FriendSuggestions() {
  const [added, setAdded] = useState(Array(suggestions.length).fill(false));

  const handleAdd = (idx) => {
    setAdded((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6  w-[95%]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-gray-800 text-base">Suggested For You </h2>
        <a href="#" className="text-xs text-blue-600 font-medium hover:underline">
          See All
        </a>
      </div>
      <ul> 
        {suggestions.map((s, idx) => (
          <li
            key={s.username}
            className={`flex items-center justify-between py-2 px-2 rounded-lg hover:bg-gray-100 transition ${
              idx === 3 ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <div className="text-sm font-medium text-gray-900">{s.name}</div>
                <div className="text-xs text-gray-500">{s.username}</div>
              </div>
            </div>
            <button
              onClick={() => handleAdd(idx)}
              className={`w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition ${
                added[idx] ? "bg-blue-100 text-blue-600" : ""
              }`}
              aria-label="Add Friend"
            >
              {added[idx] ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
