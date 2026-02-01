import { useState } from "react";
import axios from "axios";

const Clans = () => {
  const [clanName, setClanName] = useState("");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);

    if (clanName.trim().length < 3) {
      setError("Clan name must be at least 3 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get("http://localhost:3000/api/clans/search", {
  params: {
    name: clanName,
    limit: limit,
  },
});


      setResults(response.data.items || []);
    } catch (err) {
      setError("Failed to fetch clans");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-900 text-white px-6 py-10">
      
      {/* 🔍 SEARCH PANEL */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-4xl font-cinzel text-yellow-400 mb-6 text-center">
          Search Clans
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* Clan Name */}
          <input
            type="text"
            placeholder="Enter clan name"
            value={clanName}
            onChange={(e) => setClanName(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:border-yellow-400"
          />

          {/* Limit */}
          <select
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-600"
          >
            <option value={5}>Top 5</option>
            <option value={10}>Top 10</option>
            <option value={20}>Top 20</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition"
          >
            Search
          </button>
        </form>

        {error && (
          <p className="text-red-400 mt-4 text-center">{error}</p>
        )}
      </div>

      {/* 📋 RESULTS */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading && <p className="text-center col-span-full">Loading...</p>}

        {!loading && results.length === 0 && (
          <p className="text-center col-span-full text-gray-400">
            No clans found
          </p>
        )}

        {results.map((clan) => (
          <div
            key={clan.tag}
            className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:scale-105 transition"
          >
            <div className="flex items-center gap-4 mb-4">
              {clan.badgeUrls?.small && (
                <img
                  src={clan.badgeUrls.small}
                  alt={clan.name}
                  className="w-14 h-14"
                />
              )}
              <div>
                <h2 className="text-xl font-bold text-yellow-400">
                  {clan.name}
                </h2>
                <p className="text-gray-400">{clan.tag}</p>
              </div>
            </div>

            <ul className="text-sm text-gray-300 space-y-1">
              <li>🏆 Level: {clan.clanLevel}</li>
              <li>👥 Members: {clan.members}/50</li>
              <li>🌍 Location: {clan.location?.name || "Unknown"}</li>
              <li>🔥 Points: {clan.clanPoints}</li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clans;
