import { useState } from 'react';

const ClanMembersOnly = () => {
  const [clanTag, setClanTag] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMembers = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/clans/${clanTag}/members`);
      const data = await response.json();
      setMembers(data.items || []);
    } catch {
      setMembers([]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={fetchMembers} className="mb-12 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-12 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Clan Members</h2>
        <input
          type="text"
          placeholder="Clan tag (e.g., 2LYPQQLG9)"
          value={clanTag}
          onChange={(e) => setClanTag(e.target.value.replace('#', ''))}
          className="w-full px-8 py-6 bg-white/50 border-2 border-blue-200 rounded-2xl focus:border-blue-500"
          required
        />
        <button type="submit" disabled={loading} className="mt-6 w-full py-6 bg-blue-600 text-white font-bold rounded-2xl">
          Load Members
        </button>
      </form>

      {members.length > 0 && (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <tr>
                <th className="p-6 text-left font-bold">Name</th>
                <th className="p-6 text-left font-bold">Role</th>
                <th className="p-6 text-left font-bold">Trophies</th>
                <th className="p-6 text-left font-bold">Level</th>
              </tr>
            </thead>
            <tbody>
              {members.slice(0, 50).map((member, idx) => (
                <tr key={idx} className="hover:bg-gray-50 border-t">
                  <td className="p-6 font-medium">{member.name}</td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{member.role}</span>
                  </td>
                  <td className="p-6 font-bold text-green-600">{member.trophies}</td>
                  <td className="p-6">{member.expLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClanMembersOnly;
