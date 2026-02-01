import { useState } from 'react';
import ClanSearch from './components/ClanSearch';
import DirectClanLookup from './components/DirectClanLookup';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [backendStatus, setBackendStatus] = useState('checking');

  const checkBackend = async () => {
    try {
      const res = await fetch('http://localhost:3000/health');
      setBackendStatus(res.ok ? 'connected' : 'error');
    } catch {
      setBackendStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl sticky top-0 z-40 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent drop-shadow-2xl">
              Clash of Clans API Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={checkBackend}
                className={`px-6 py-2 rounded-xl font-bold transition-all ${
                  backendStatus === 'connected'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : backendStatus === 'error'
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                    : 'bg-gray-500/50 text-white/70'
                }`}
              >
                {backendStatus === 'connected' ? '🟢 Backend OK' : '🔴 Backend OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-4 mb-12 bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/20">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-8 py-4 font-bold rounded-2xl transition-all shadow-xl ${
              activeTab === 'search'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/50 scale-105'
                : 'bg-white/20 text-white/80 hover:bg-white/30 hover:scale-105'
            }`}
          >
            🔍 Search Clans
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            className={`px-8 py-4 font-bold rounded-2xl transition-all shadow-xl ${
              activeTab === 'lookup'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/50 scale-105'
                : 'bg-white/20 text-white/80 hover:bg-white/30 hover:scale-105'
            }`}
          >
            📋 Direct Clan Lookup
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`px-8 py-4 font-bold rounded-2xl transition-all shadow-xl ${
              activeTab === 'members'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/50 scale-105'
                : 'bg-white/20 text-white/80 hover:bg-white/30 hover:scale-105'
            }`}
          >
            👥 Clan Members
          </button>
          <button
            onClick={() => setActiveTab('warlog')}
            className={`px-8 py-4 font-bold rounded-2xl transition-all shadow-xl ${
              activeTab === 'warlog'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/50 scale-105'
                : 'bg-white/20 text-white/80 hover:bg-white/30 hover:scale-105'
            }`}
          >
            ⚔️ War Log
          </button>
        </div>

        {/* Content */}
        <div className="min-h-[60vh]">
          {activeTab === 'search' && <ClanSearch />}
          {activeTab === 'lookup' && <DirectClanLookup />}
          {activeTab === 'members' && <ClanMembersOnly />}
          {activeTab === 'warlog' && <ClanWarLogOnly />}
        </div>
      </div>
    </div>
  );
}

export default App;
