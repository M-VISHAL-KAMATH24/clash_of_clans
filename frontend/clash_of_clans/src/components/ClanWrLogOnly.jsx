import { useState } from 'react';

const ClanWarLogOnly = () => {
  const [clanTag, setClanTag] = useState('');
  const [warlog, setWarlog] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWarLog = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/clans/${clanTag}/warlog`);
      const data = await response.json();
      setWarlog(data.items || []);
    } catch {
      setWarlog([]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={fetchWarLog} className="mb-12 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-12 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Clan War Log</h2>
        <input
          type="text"
          placeholder="Clan tag (e.g., 2LYPQQLG9)"
          value={clanTag}
          onChange={(e) => setClanTag(e.target.value.replace('#', ''))}
          className="w-full px-8 py-6 bg-white/50 border-2 border-red-200 rounded-2xl focus:border-red-500"
          required
        />
        <button type="submit" disabled={loading} className="mt-6 w-full py-6 bg-red-600 text-white font-bold rounded-2xl">
          Load War Log
        </button>
      </form>

      {warlog.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warlog.slice(0, 12).map((war, idx) => (
            <div key={idx} className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 border border-red-200/50 hover:scale-105 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-4 py-2 rounded-2xl font-bold text-sm ${
                  war.result === 'win' ? 'bg-emerald-500/90 text-white' :
                  war.result === 'lose' ? 'bg-red-500/90 text-white' : 'bg-yellow-500/90 text-white'
                }`}>
                  {war.result?.toUpperCase()}
                </span>
                <span className="text-sm text-gray-400">{new Date(war.preparationStartTime).toLocaleDateString()}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>Team Size: <span className="font-bold">{war.teamSize}</span></div>
                <div>Attacks: <span className="font-bold">{war.attacks}</span></div>
                <div>Stars: <span className="font-bold">{war.stars}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClanWarLogOnly;
