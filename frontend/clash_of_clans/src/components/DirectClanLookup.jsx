import { useState } from 'react';

const DirectClanLookup = () => {
  const [clanTag, setClanTag] = useState('');
  const [clanData, setClanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`http://localhost:3000/api/clans/${clanTag}`);
      if (!response.ok) throw new Error('Clan not found');
      const data = await response.json();
      setClanData(data);
    } catch (err) {
      setError('Clan not found or invalid tag');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleLookup} className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Direct Clan Lookup</h2>
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Enter clan tag (e.g., 2LYPQQLG9 or #2LYPQQLG9)"
            value={clanTag}
            onChange={(e) => setClanTag(e.target.value.replace('#', ''))}
            className="w-full px-8 py-6 bg-white/50 border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none text-xl transition-all"
          />
          <button
            type="submit"
            disabled={loading || !clanTag}
            className="w-full py-6 px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-2xl hover:from-purple-700 hover:to-pink-700 shadow-xl transform hover:-translate-y-2 transition-all disabled:opacity-50"
          >
            {loading ? 'Fetching...' : 'Lookup Clan'}
          </button>
        </div>

        {error && <p className="mt-6 p-6 bg-red-100 border border-red-300 rounded-2xl text-red-800 font-medium">{error}</p>}

        {clanData && (
          <div className="mt-12 p-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl border-2 border-emerald-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{clanData.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-black text-emerald-600">{clanData.clanLevel}</div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
              <div>
                <div className="text-3xl font-black text-blue-600">{clanData.members}</div>
                <div className="text-sm text-gray-600">Members</div>
              </div>
              <div>
                <div className="text-3xl font-black text-purple-600">{clanData.clanPoints.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <div>
                <div className="text-3xl font-black text-orange-600">{clanData.clanVersusPoints.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Versus Points</div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default DirectClanLookup;
