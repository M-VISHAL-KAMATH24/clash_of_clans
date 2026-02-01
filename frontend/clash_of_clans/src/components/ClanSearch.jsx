import { useState } from 'react';
import ClanCard from './ClanCard';
import ClanMembers from './ClanMembers';

const ClanSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clans, setClans] = useState([]);
  const [selectedClan, setSelectedClan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = 'http://localhost:3000/api/clans';

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.length < 3) return setError('Name must be 3+ characters');

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/search?name=${searchTerm}&limit=10`);
      const data = await response.json();
      setClans(data.items || []);
      setSelectedClan(null);
    } catch (err) {
      setError('Search failed');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          Clash of Clans Explorer
        </h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search clans (e.g., Polar, Infinity...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-6 py-4 bg-white/50 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all text-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
      </form>

      {/* Results */}
      {clans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clans.map((clan) => (
            <ClanCard
              key={clan.tag}
              clan={clan}
              onSelect={() => setSelectedClan(clan)}
              selectedClanTag={selectedClan?.tag}
            />
          ))}
        </div>
      )}

      {/* Selected Clan Details */}
      {selectedClan && (
        <ClanMembers clanTag={selectedClan.tag} onClose={() => setSelectedClan(null)} />
      )}
    </div>
  );
};

export default ClanSearch;
