const ClanCard = ({ clan, onSelect, selectedClanTag }) => {
  return (
    <div
      onClick={onSelect}
      className={`group cursor-pointer bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-white/40 ${
        selectedClanTag === clan.tag ? 'ring-4 ring-purple-400/50 scale-105 shadow-2xl' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl">
            <span className="text-2xl font-bold text-white">{clan.clanLevel}</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
              {clan.name}
            </h3>
            <p className="text-sm text-gray-300 font-mono text-xs">
              {clan.tag}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4 text-sm">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
            <span className="text-emerald-400 font-bold">{clan.members}</span>
          </div>
          <span className="text-gray-300">Members</span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <span className="text-blue-400 font-bold">{clan.clanPoints.toLocaleString()}</span>
          </div>
          <span className="text-gray-300">Points</span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className={`w-3 h-3 rounded-full ${clan.warFrequency === 'Always' ? 'bg-red-400' : 'bg-yellow-400'}`} />
          <span className="text-gray-300 capitalize">{clan.warFrequency}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <span className="px-4 py-2 bg-white/10 rounded-xl text-white/80 text-sm font-medium group-hover:bg-purple-500/20 transition-all">
          View Details →
        </span>
      </div>
    </div>
  );
};

export default ClanCard;
