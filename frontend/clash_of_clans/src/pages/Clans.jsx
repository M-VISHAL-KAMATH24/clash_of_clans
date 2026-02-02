import { useState } from "react";
import axios from "axios";
import "../Clans.css"
const API_BASE = "http://localhost:3000/api/clans";

const Clans = () => {
  const [mode, setMode] = useState("name"); // "name" | "tag"
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [results, setResults] = useState([]);
  const [clan, setClan] = useState(null);
  const [members, setMembers] = useState([]);
  const [warlog, setWarlog] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);
    setClan(null);
    setMembers([]);
    setWarlog([]);

    if (query.trim().length < 3) {
      setError("Minimum 3 characters required");
      return;
    }

    try {
      setLoading(true);

      // 🔍 SEARCH BY NAME
      if (mode === "name") {
        const res = await axios.get(`${API_BASE}/search`, {
          params: { name: query, limit },
        });
        setResults(res.data.items || []);
      }

      // 🏷️ SEARCH BY TAG
      if (mode === "tag") {
        const clanRes = await axios.get(`${API_BASE}/${query}`);
        const membersRes = await axios.get(`${API_BASE}/${query}/members`);
        const warlogRes = await axios.get(`${API_BASE}/${query}/warlog`);

        setClan(clanRes.data);
        setMembers(membersRes.data.items || []);
        setWarlog(warlogRes.data.items || []);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || "Failed to fetch data";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white px-6 py-10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-400 rounded-full opacity-10 animate-pulse delay-75"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-cyan-400 rounded-full opacity-10 animate-pulse delay-150"></div>
      </div>

      {/* Title with Game Style */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2 drop-shadow-2xl animate-pulse">
          ⚔️ CLAN WARS ⚔️
        </h1>
        <p className="text-cyan-300 text-lg font-semibold tracking-wide">
          🎮 Battle Stats & Glory Awaits 🎮
        </p>
      </div>
      {/* Back to Home Button */}
<div className="relative z-10 max-w-6xl mx-auto mb-6">
  
    <a href="/"
    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold rounded-lg border-2 border-slate-600 hover:border-cyan-400 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
  >
    <span className="text-xl">🏠</span>
    <span>Back to Home</span>
  </a>
</div>

      {/* MODE TOGGLE - Game Style Buttons */}
      <div className="relative z-10 flex justify-center gap-4 mb-8">
        <button
          onClick={() => setMode("name")}
          className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
            mode === "name"
              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-500/50 scale-105"
              : "bg-slate-800/80 text-gray-300 hover:bg-slate-700/80 border-2 border-slate-600"
          }`}
        >
          🔍 Search by Name
        </button>
        <button
          onClick={() => setMode("tag")}
          className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
            mode === "tag"
              ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg shadow-cyan-500/50 scale-105"
              : "bg-slate-800/80 text-gray-300 hover:bg-slate-700/80 border-2 border-slate-600"
          }`}
        >
          🏷️ Search by Tag
        </button>
      </div>

      {/* SEARCH FORM - Enhanced Gaming Style */}
      <form
        onSubmit={handleSearch}
        className="relative z-10 max-w-4xl mx-auto flex gap-4 mb-8"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === "name" ? "🔎 Enter clan name..." : "🏷️ Enter clan tag (e.g., 2LYPQQLG9)"}
          className="flex-1 px-6 py-4 rounded-lg bg-slate-800/90 border-2 border-purple-500/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 text-white placeholder-gray-400 transition-all duration-300"
        />

        {mode === "name" && (
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="px-6 py-4 rounded-lg bg-slate-800/90 border-2 border-purple-500/50 focus:border-cyan-400 focus:outline-none text-white cursor-pointer transition-all duration-300"
          >
            <option value={5}>Top 5 🏆</option>
            <option value={10}>Top 10 🥇</option>
            <option value={20}>Top 20 🎯</option>
          </select>
        )}

        <button className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold text-lg rounded-lg shadow-lg shadow-green-500/50 hover:shadow-green-500/80 transform hover:scale-105 transition-all duration-300">
          🚀 SEARCH
        </button>
      </form>

      {/* Error Message - Game Style */}
      {error && (
        <div className="relative z-10 max-w-4xl mx-auto mb-6">
          <p className="text-center bg-red-500/20 border-2 border-red-500 text-red-300 px-6 py-3 rounded-lg animate-pulse">
            ⚠️ {error}
          </p>
        </div>
      )}

      {/* Loading Animation */}
      {loading && (
        <div className="relative z-10 text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-cyan-300 mt-4 text-lg font-semibold animate-pulse">Loading epic data...</p>
          </div>
        </div>
      )}

      {/* 🔍 SEARCH RESULTS - Enhanced Cards */}
      {mode === "name" && results.length > 0 && (
        <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {results.map((c, index) => (
            <div
              key={c.tag}
              style={{ animationDelay: `${index * 100}ms` }}
              className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-6 rounded-xl border-2 border-purple-500/30 hover:border-cyan-400 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 animate-fadeIn"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {c.name}
                </h2>
                <span className="bg-purple-500/30 px-3 py-1 rounded-full text-xs font-bold text-purple-200">
                  Lv {c.clanLevel}
                </span>
              </div>
              
              <p className="text-cyan-300 font-mono text-sm mb-3">{c.tag}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  <span className="font-bold text-green-400">{c.members}</span>
                  <span className="text-gray-400">/50</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🏷️ CLAN DETAILS - Enhanced Layout */}
      {mode === "tag" && clan && (
        <div className="relative z-10 max-w-6xl mx-auto space-y-8">
          {/* Clan Header Card */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-8 rounded-xl border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                  {clan.name}
                </h2>
                <p className="text-cyan-300 font-mono text-lg">{clan.tag}</p>
              </div>
              
              <div className="flex gap-6">
                <div className="text-center bg-purple-500/20 px-6 py-3 rounded-lg border border-purple-400/30">
                  <p className="text-sm text-gray-400">Level</p>
                  <p className="text-3xl font-bold text-purple-300">{clan.clanLevel}</p>
                </div>
                <div className="text-center bg-green-500/20 px-6 py-3 rounded-lg border border-green-400/30">
                  <p className="text-sm text-gray-400">Members</p>
                  <p className="text-3xl font-bold text-green-300">{clan.members}</p>
                </div>
              </div>
            </div>
          </div>

          {/* MEMBERS Section */}
          <div className="bg-slate-800/90 p-6 rounded-xl border-2 border-purple-500/30">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">👥</span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Clan Members
              </span>
            </h3>
            
            <ul className="grid md:grid-cols-2 gap-3">
              {members.map((m, index) => (
                <li
                  key={m.tag}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 hover:border-cyan-400 hover:bg-slate-700/80 transition-all duration-300 animate-fadeIn flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-200">{m.name}</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-bold border border-yellow-500/30">
                    {m.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* WAR LOG Section */}
          <div className="bg-slate-800/90 p-6 rounded-xl border-2 border-purple-500/30">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-3xl">⚔️</span>
              <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                Battle History
              </span>
            </h3>

            <ul className="space-y-4">
              {warlog.map((war, index) => {
                const result = war.result || "unknown";

                const resultConfig = {
                  win: { 
                    color: "text-green-400", 
                    bg: "bg-green-500/20", 
                    border: "border-green-400/50",
                    icon: "🏆"
                  },
                  lose: { 
                    color: "text-red-400", 
                    bg: "bg-red-500/20", 
                    border: "border-red-400/50",
                    icon: "💔"
                  },
                  tie: { 
                    color: "text-yellow-400", 
                    bg: "bg-yellow-500/20", 
                    border: "border-yellow-400/50",
                    icon: "🤝"
                  },
                  unknown: { 
                    color: "text-gray-400", 
                    bg: "bg-gray-500/20", 
                    border: "border-gray-400/50",
                    icon: "❓"
                  }
                };

                const config = resultConfig[result] || resultConfig.unknown;

                const ourClanName = clan?.name || "Unknown Clan";
                const opponentName = war.opponent?.name && war.opponent.name.trim() ? war.opponent.name : "Unknown Clan";

                const ourStars = war.clan?.stars ?? 0;
                const oppStars = war.opponent?.stars ?? 0;
                const ourDestruction = war.clan?.destructionPercentage ?? 0;
                const oppDestruction = war.opponent?.destructionPercentage ?? 0;

                const endTime = war.endTime
                  ? new Date(war.endTime.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6Z"))
                  : null;

                const daysAgo = endTime
                  ? Math.floor((Date.now() - endTime.getTime()) / (1000 * 60 * 60 * 24))
                  : null;

                return (
                  <li
                    key={index}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className={`${config.bg} border-2 ${config.border} rounded-xl p-5 hover:scale-102 transform transition-all duration-300 animate-fadeIn`}
                  >
                    {/* RESULT + TIME */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{config.icon}</span>
                        <span className={`font-bold uppercase text-xl ${config.color}`}>
                          {result}
                        </span>
                      </div>

                      {daysAgo !== null && (
                        <span className="text-sm text-gray-400 bg-slate-700/50 px-3 py-1 rounded-full">
                          📅 {daysAgo} days ago
                        </span>
                      )}
                    </div>

                    {/* CLAN VS CLAN */}
                    <div className="text-lg font-semibold text-gray-200 mb-4 text-center py-3 bg-slate-700/30 rounded-lg">
                      <span className="text-cyan-400 font-bold">
                        {ourClanName}
                      </span>
                      <span className="text-red-400 mx-3 text-2xl">⚔️</span>
                      <span className="text-orange-400 font-bold">
                        {opponentName}
                      </span>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-700/40 p-3 rounded-lg text-center">
                        <p className="text-xs text-gray-400 mb-1">STARS</p>
                        <p className="text-xl font-bold">
                          <span className="text-yellow-400">{ourStars}</span>
                          <span className="text-gray-500 mx-2">-</span>
                          <span className="text-orange-400">{oppStars}</span>
                        </p>
                      </div>

                      <div className="bg-slate-700/40 p-3 rounded-lg text-center">
                        <p className="text-xs text-gray-400 mb-1">DESTRUCTION</p>
                        <p className="text-xl font-bold">
                          <span className="text-red-400">{ourDestruction}%</span>
                          <span className="text-gray-500 mx-2">-</span>
                          <span className="text-orange-400">{oppDestruction}%</span>
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

    </section>
  );
};

export default Clans;