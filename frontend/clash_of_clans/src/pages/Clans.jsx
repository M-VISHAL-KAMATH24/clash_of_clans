import { useState } from "react";
import axios from "axios";

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
      setError(err.response?.data?.error || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <h1 className="text-4xl font-cinzel text-yellow-400 mb-6 text-center">
        Clans
      </h1>

      {/* MODE TOGGLE */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setMode("name")}
          className={`px-4 py-2 rounded ${
            mode === "name" ? "bg-yellow-400 text-black" : "bg-slate-700"
          }`}
        >
          Search by Name
        </button>
        <button
          onClick={() => setMode("tag")}
          className={`px-4 py-2 rounded ${
            mode === "tag" ? "bg-yellow-400 text-black" : "bg-slate-700"
          }`}
        >
          Search by Tag
        </button>
      </div>

      {/* SEARCH FORM */}
      <form
        onSubmit={handleSearch}
        className="max-w-4xl mx-auto flex gap-4 mb-8"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === "name" ? "Clan name" : "Clan tag (2LYPQQLG9)"}
          className="flex-1 px-4 py-3 rounded bg-slate-800 border border-slate-600"
        />

        {mode === "name" && (
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="px-4 py-3 rounded bg-slate-800 border border-slate-600"
          >
            <option value={5}>Top 5</option>
            <option value={10}>Top 10</option>
            <option value={20}>Top 20</option>
          </select>
        )}

        <button className="px-6 py-3 bg-yellow-400 text-black font-bold rounded">
          Search
        </button>
      </form>

      {error && <p className="text-red-400 text-center">{error}</p>}
      {loading && <p className="text-center">Loading...</p>}

      {/* 🔍 SEARCH RESULTS */}
      {mode === "name" && results.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {results.map((c) => (
            <div key={c.tag} className="bg-slate-800 p-4 rounded">
              <h2 className="text-yellow-400 font-bold">{c.name}</h2>
              <p>{c.tag}</p>
              <p>Level: {c.clanLevel}</p>
              <p>Members: {c.members}/50</p>
            </div>
          ))}
        </div>
      )}

      {/* 🏷️ CLAN DETAILS */}
      {mode === "tag" && clan && (
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="bg-slate-800 p-6 rounded">
            <h2 className="text-2xl text-yellow-400">{clan.name}</h2>
            <p>{clan.tag}</p>
            <p>Level: {clan.clanLevel}</p>
            <p>Members: {clan.members}</p>
          </div>

          {/* MEMBERS */}
          <div>
            <h3 className="text-xl mb-2">Members</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {members.map((m) => (
                <li key={m.tag} className="bg-slate-800 p-2 rounded">
                  {m.name} — {m.role}
                </li>
              ))}
            </ul>
          </div>

          {/* WAR LOG */}
       {/* WAR LOG */}
<div>
  <h3 className="text-xl mb-4 text-yellow-400">War Log</h3>

  <ul className="space-y-3">
    {warlog.map((war, index) => {
      // Result
      const result = war.result || "unknown";

      const resultColor =
        result === "win"
          ? "text-green-400"
          : result === "lose"
          ? "text-red-400"
          : result === "tie"
          ? "text-yellow-400"
          : "text-gray-400";

      // Clan names
      const ourClanName = clan?.name || "Unknown Clan";

      const opponentName =
        war.opponent?.name && war.opponent.name.trim()
          ? war.opponent.name
          : "Unknown Clan";

      // Stars & destruction
      const ourStars = war.clan?.stars ?? 0;
      const oppStars = war.opponent?.stars ?? 0;

      const ourDestruction =
        war.clan?.destructionPercentage ?? 0;
      const oppDestruction =
        war.opponent?.destructionPercentage ?? 0;

      // War end time → days ago
      const endTime = war.endTime
        ? new Date(
            war.endTime.replace(
              /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,
              "$1-$2-$3T$4:$5:$6Z"
            )
          )
        : null;

      const daysAgo = endTime
        ? Math.floor(
            (Date.now() - endTime.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : null;

      return (
        <li
          key={index}
          className="bg-slate-800 border border-slate-700 rounded-lg p-4"
        >
          {/* RESULT + TIME */}
          <div className="flex justify-between items-center mb-2">
            <span className={`font-bold uppercase ${resultColor}`}>
              {result}
            </span>

            {daysAgo !== null && (
              <span className="text-sm text-gray-400">
                {daysAgo} days ago
              </span>
            )}
          </div>

          {/* CLAN VS CLAN */}
          <div className="text-lg font-semibold text-gray-200 mb-2">
            <span className="text-yellow-400">
              {ourClanName}
            </span>{" "}
            <span className="text-gray-400 mx-1">vs</span>{" "}
            <span className="text-yellow-400">
              {opponentName}
            </span>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-gray-300">
            <div>
              ⭐ <span className="font-bold">{ourStars}</span> -{" "}
              <span className="font-bold">{oppStars}</span>
            </div>

            <div>
              💥 {ourDestruction}% - {oppDestruction}%
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
