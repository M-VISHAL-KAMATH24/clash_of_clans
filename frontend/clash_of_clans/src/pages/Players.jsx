import { useState } from "react";
import axios from "axios";
import "../Players.css";

const API_BASE = "http://localhost:3000/api/players";

const Players = () => {
  const [playerTag, setPlayerTag] = useState("");
  const [player, setPlayer] = useState(null);

  const [token, setToken] = useState("");
  const [tokenResult, setTokenResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FETCH PLAYER
  const fetchPlayer = async (e) => {
    e.preventDefault();
    setError("");
    setPlayer(null);
    setTokenResult(null);

    if (playerTag.trim().length < 3) {
      setError("Player tag is too short");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/${playerTag.trim()}`);
      setPlayer(res.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || "Failed to fetch player";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // VERIFY TOKEN
  const verifyToken = async () => {
    setError("");
    setTokenResult(null);

    if (!token.trim()) {
      setError("Token is required");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE}/${playerTag.trim()}/verifytoken`,
        { token }
      );
      setTokenResult(res.data.status);
    } catch {
      setError("Token verification failed");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white px-6 py-10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-cyan-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-yellow-400 rounded-full opacity-10 animate-pulse delay-75"></div>
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-pink-400 rounded-full opacity-10 animate-pulse delay-150"></div>
      </div>

      {/* Title with Game Style */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2 drop-shadow-2xl animate-pulse">
          🎮 PLAYER STATS 🎮
        </h1>
        <p className="text-yellow-300 text-lg font-semibold tracking-wide">
          ⚡ Check Your Battle Power ⚡
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

      {/* SEARCH + VERIFY TOKEN (TOP) */}
      <div className="relative z-10 max-w-4xl mx-auto bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-8 rounded-xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 mb-8 space-y-6">
        <form onSubmit={fetchPlayer} className="flex gap-4">
          <input
            value={playerTag}
            onChange={(e) => setPlayerTag(e.target.value)}
            placeholder="🏷️ Enter Player Tag (e.g. 2LYPQQLG9)"
            className="flex-1 px-6 py-4 rounded-lg bg-slate-700/80 border-2 border-cyan-500/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 text-white placeholder-gray-400 transition-all duration-300"
          />
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-lg shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/80 transform hover:scale-105 transition-all duration-300">
            🔍 FETCH
          </button>
        </form>
        

        {/* TOKEN VERIFY */}
        <div className="flex gap-3">
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="🔑 Enter API Token from game"
            className="flex-1 px-6 py-4 rounded-lg bg-slate-700/80 border-2 border-green-500/50 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 text-white placeholder-gray-400 transition-all duration-300"
          />
          <button
            onClick={verifyToken}
            className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold text-lg rounded-lg shadow-lg shadow-green-500/50 hover:shadow-green-500/80 transform hover:scale-105 transition-all duration-300"
          >
            ✓ VERIFY
          </button>
        </div>

        {tokenResult && (
          <div className={`p-4 rounded-lg font-bold text-center text-lg border-2 ${
              tokenResult === "ok"
                ? "bg-green-500/20 border-green-400 text-green-300"
                : "bg-red-500/20 border-red-400 text-red-300"
            }`}
          >
            {tokenResult === "ok" ? "✅" : "❌"} Token Status: {tokenResult.toUpperCase()}
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border-2 border-red-500 text-red-300 px-6 py-3 rounded-lg animate-pulse text-center">
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Loading Animation */}
      {loading && (
        <div className="relative z-10 text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-cyan-300 mt-4 text-lg font-semibold animate-pulse">Loading player data...</p>
          </div>
        </div>
      )}

      {/* PLAYER DATA */}
      {player && (
        <div className="relative z-10 max-w-6xl mx-auto space-y-6">
          {/* BASIC INFO - Hero Card Style */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-8 rounded-xl border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20 animate-fadeIn">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                👤
              </div>
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  {player.name}
                </h2>
                <p className="text-cyan-300 font-mono text-lg">{player.tag}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <StatCard icon="⭐" label="XP Level" value={player.expLevel} color="yellow" />
              <StatCard icon="🏆" label="Trophies" value={player.trophies} color="cyan" />
              <StatCard icon="🔥" label="Best" value={player.bestTrophies} color="orange" />
              <StatCard icon="⚔️" label="War Stars" value={player.warStars} color="red" />
              <StatCard icon="🏰" label="Town Hall" value={player.townHallLevel} color="purple" />
              <StatCard icon="🔫" label="TH Weapon" value={player.townHallWeaponLevel} color="green" />
              <StatCard icon="🛠️" label="Builder Hall" value={player.builderHallLevel} color="blue" />
              <StatCard icon="🏗️" label="BB Trophies" value={player.builderBaseTrophies} color="pink" />
            </div>
          </div>

          {/* LEAGUES */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-6 rounded-xl border-2 border-purple-500/30 hover:border-purple-400 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">🏅</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Leagues
              </span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <LeagueCard label="Main League" value={player.league?.name || "Unranked"} />
              <LeagueCard label="League Tier" value={player.leagueTier?.name || "N/A"} />
              <LeagueCard label="Builder Base" value={player.builderBaseLeague?.name || "Unranked"} />
            </div>
          </div>

          {/* CLAN */}
          {player.clan && (
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-6 rounded-xl border-2 border-green-500/30 hover:border-green-400 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '200ms' }}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">🛡️</span>
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Clan Info
                </span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Clan Name</p>
                  <p className="text-xl font-bold text-green-300">{player.clan.name}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Clan Tag</p>
                  <p className="text-xl font-mono text-cyan-300">{player.clan.tag}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Role</p>
                  <p className="text-xl font-bold text-yellow-300">{player.role}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">War Preference</p>
                  <p className="text-xl font-bold text-orange-300">{player.warPreference}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg md:col-span-2">
                  <p className="text-gray-400 text-sm mb-1">Capital Contribution</p>
                  <p className="text-xl font-bold text-purple-300">{player.clanCapitalContributions}</p>
                </div>
              </div>
            </div>
          )}

          {/* HEROES */}
          <Section title="Heroes" items={player.heroes} icon="🦸" gradient="from-red-400 to-orange-500" delay="300ms" />

          {/* HERO EQUIPMENT */}
          <Section title="Hero Equipment" items={player.heroEquipment} icon="⚔️" gradient="from-yellow-400 to-orange-500" delay="400ms" />

          {/* TROOPS */}
          <Section title="Troops" items={player.troops} icon="🪖" gradient="from-green-400 to-emerald-500" delay="500ms" />

          {/* SPELLS */}
          <Section title="Spells" items={player.spells} icon="✨" gradient="from-purple-400 to-pink-500" delay="600ms" />

          {/* ACHIEVEMENTS */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-6 rounded-xl border-2 border-yellow-500/30 hover:border-yellow-400 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '700ms' }}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">🏆</span>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Achievements
              </span>
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {player.achievements?.map((a, index) => (
                <div
                  key={a.name}
                  style={{ animationDelay: `${700 + index * 30}ms` }}
                  className="bg-slate-700/50 p-4 rounded-lg hover:bg-slate-700/80 transition-all duration-300 border border-slate-600 hover:border-yellow-400 animate-fadeIn"
                >
                  <p className="text-gray-400 text-xs mb-1">{a.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-yellow-300">
                      {a.value}/{a.target}
                    </p>
                    <div className="w-12 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                        style={{ width: `${Math.min((a.value / a.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
    
  );
};

// STAT CARD COMPONENT
const StatCard = ({ icon, label, value, color }) => {
  const colorClasses = {
    yellow: "from-yellow-400 to-orange-500",
    cyan: "from-cyan-400 to-blue-500",
    orange: "from-orange-400 to-red-500",
    red: "from-red-400 to-pink-500",
    purple: "from-purple-400 to-pink-500",
    green: "from-green-400 to-emerald-500",
    blue: "from-blue-400 to-cyan-500",
    pink: "from-pink-400 to-purple-500",
  };

  return (
    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
        {value}
      </p>
    </div>
  );
};

// LEAGUE CARD COMPONENT
const LeagueCard = ({ label, value }) => (
  <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 hover:border-purple-400 transition-all duration-300">
    <p className="text-gray-400 text-sm mb-2">{label}</p>
    <p className="text-lg font-bold text-purple-300">{value}</p>
  </div>
);

// REUSABLE SECTION COMPONENT
const Section = ({ title, items, icon, gradient, delay }) => (
  <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-6 rounded-xl border-2 border-purple-500/30 hover:border-purple-400 transition-all duration-300 animate-fadeIn" style={{ animationDelay: delay }}>
    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <span className="text-3xl">{icon}</span>
      <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {title}
      </span>
    </h3>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items?.map((i, index) => (
        <div
          key={i.name}
          style={{ animationDelay: `${parseInt(delay) + index * 50}ms` }}
          className="bg-slate-700/50 p-4 rounded-lg hover:bg-slate-700/80 transition-all duration-300 border border-slate-600 hover:border-cyan-400 transform hover:scale-105 animate-fadeIn"
        >
          <p className="text-sm text-gray-300 mb-1">{i.name}</p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-bold text-lg">Lv {i.level}</span>
            <div className="flex-1 h-1.5 bg-slate-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                style={{ width: `${Math.min(i.level * 10, 100)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Players;