import { useState, useEffect } from 'react';

const ClanMembers = ({ clanTag, onClose }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warlog, setWarlog] = useState([]);
  const [clanInfo, setClanInfo] = useState(null);

  useEffect(() => {
    fetchClanData();
  }, [clanTag]);

  const fetchClanData = async () => {
    setLoading(true);
    try {
      // Fetch clan info
      const clanRes = await fetch(`http://localhost:3000/api/clans/${clanTag}`);
      const clanData = await clanRes.json();
      setClanInfo(clanData);

      // Fetch members
      const membersRes = await fetch(`http://localhost:3000/api/clans/${clanTag}/members`);
      const membersData = await membersRes.json();
      setMembers(membersData.items || []);

      // Fetch warlog
      const warlogRes = await fetch(`http://localhost:3000/api/clans/${clanTag}/warlog`);
      const warlogData = await warlogRes.json();
      setWarlog(warlogData.items || []);
    } catch (error) {
      console.error('Error fetching clan data:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 mx-auto mb-4"></div>
          <p className="text-xl font-bold text-gray-700">Loading clan details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 p-6">
      <div className="max-w-7xl mx-auto h-full overflow-y-auto">
        <div className="bg-gradient-to-b from-white/95 to-gray-50/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-xl rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  onClick={onClose}
                  className="p-3 bg-gray-200/50 hover:bg-gray-300 rounded-2xl transition-all hover:scale-105"
                >
                  ← Back
                </button>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {clanInfo?.name} ({clanInfo?.tag})
                </h2>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Members Table */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Members ({members.length})</h3>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full bg-white">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-50 to-pink-50">
                      <th className="p-4 text-left font-bold text-gray-700">Name</th>
                      <th className="p-4 text-left font-bold text-gray-700">Role</th>
                      <th className="p-4 text-left font-bold text-gray-700">Trophies</th>
                      <th className="p-4 text-left font-bold text-gray-700">Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.slice(0, 20).map((member, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 border-t border-gray-100">
                        <td className="p-4 font-medium text-gray-900">{member.name}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            {member.role}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-green-600">{member.trophies}</td>
                        <td className="p-4 text-gray-700">{member.expLevel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* War Log */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Recent Wars ({warlog.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {warlog.slice(0, 6).map((war, idx) => (
                  <div key={idx} className="p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        war.result === 'win' ? 'bg-emerald-200 text-emerald-800' :
                        war.result === 'lose' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {war.result?.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">{new Date(war.preparationStartTime).toLocaleDateString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-bold text-gray-900">{war.teamSize}</p>
                        <p className="text-gray-600">Team Size</p>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{war.attacks}</p>
                        <p className="text-gray-600">Attacks</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClanMembers;
