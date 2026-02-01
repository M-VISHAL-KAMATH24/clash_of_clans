import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000/api/players";

const Players = () => {
  const [playerTag, setPlayerTag] = useState("");
  const [player, setPlayer] = useState(null);

  const [token, setToken] = useState("");
  const [tokenResult, setTokenResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError(err.response?.data?.error || "Failed to fetch player");
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async () => {
    setTokenResult(null);
    setError("");

    if (!token.trim()) {
      setError("Token is required for verification");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE}/${playerTag.trim()}/verifytoken`,
        { token }
      );

      setTokenResult(res.data.status);
    } catch (err) {
      setError("Token verification failed");
    }
  };

  return (
    <section className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <h1 className="text-4xl font-cinzel text-yellow-400 mb-6 text-center">
        Player Lookup
      </h1>

      {/* SEARCH */}
      <form
        onSubmit={fetchPlayer}
        className="max-w-3xl mx-auto flex gap-4 mb-8"
      >
        <input
          value={playerTag}
          onChange={(e) => setPlayerTag(e.target.value)}
          placeholder="Enter Player Tag (e.g. 2LYPQQLG9)"
          className="flex-1 px-4 py-3 rounded bg-slate-800 border border-slate-600"
        />

        <button className="px-6 py-3 bg-yellow-400 text-black font-bold rounded">
          Fetch
        </button>
      </form>

      {error && <p className="text-red-400 text-center mb-6">{error}</p>}
      {loading && <p className="text-center">Loading...</p>}

      {/* PLAYER INFO */}
      {player && (
        <div className="max-w-5xl mx-auto space-y-8">
          {/* BASIC INFO */}
          <div className="bg-slate-800 p-6 rounded">
            <h2 className="text-2xl text-yellow-400 font-bold">
              {player.name}
            </h2>
            <p className="text-gray-400">{player.tag}</p>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>🏰 Town Hall: {player.townHallLevel}</div>
              <div>⭐ XP: {player.expLevel}</div>
              <div>🏆 Trophies: {player.trophies}</div>
              <div>🔥 Best: {player.bestTrophies}</div>
            </div>
          </div>

          {/* CLAN */}
          {player.clan && (
            <div className="bg-slate-800 p-4 rounded">
              <h3 className="text-xl text-yellow-400">Clan</h3>
              <p>{player.clan.name}</p>
              <p className="text-gray-400">{player.clan.tag}</p>
            </div>
          )}

          {/* HEROES */}
          <div>
            <h3 className="text-xl text-yellow-400 mb-2">Heroes</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {player.heroes?.map((h) => (
                <div
                  key={h.name}
                  className="bg-slate-800 p-3 rounded"
                >
                  {h.name} — Level {h.level}
                </div>
              ))}
            </div>
          </div>

          {/* TROOPS */}
          <div>
            <h3 className="text-xl text-yellow-400 mb-2">Troops</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {player.troops?.map((t) => (
                <div
                  key={t.name}
                  className="bg-slate-800 p-3 rounded"
                >
                  {t.name} — Level {t.level}
                </div>
              ))}
            </div>
          </div>

          {/* SPELLS */}
          <div>
            <h3 className="text-xl text-yellow-400 mb-2">Spells</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {player.spells?.map((s) => (
                <div
                  key={s.name}
                  className="bg-slate-800 p-3 rounded"
                >
                  {s.name} — Level {s.level}
                </div>
              ))}
            </div>
          </div>

          {/* TOKEN VERIFY */}
          <div className="bg-slate-800 p-6 rounded">
            <h3 className="text-xl text-yellow-400 mb-3">
              Verify Player Token
            </h3>

            <div className="flex gap-3">
              <input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter API token from game"
                className="flex-1 px-4 py-3 rounded bg-slate-700"
              />

              <button
                onClick={verifyToken}
                className="px-6 py-3 bg-green-400 text-black font-bold rounded"
              >
                Verify
              </button>
            </div>

            {tokenResult && (
              <p
                className={`mt-3 font-bold ${
                  tokenResult === "ok"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                Token status: {tokenResult.toUpperCase()}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Players;
