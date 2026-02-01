const express = require('express');
const axios = require('axios');
const router = express.Router();
const API_BASE = 'https://api.clashofclans.com/v1';

// Helper function to format clan tag correctly
const formatClanTag = (tag) => {
  // Remove # if present, then URL encode (adds %23 prefix)
  return encodeURIComponent(tag.replace('#', ''));
};

// 1. Search clans
router.get('/search', async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    if (req.query.name && req.query.name.length < 3) {
      return res.status(400).json({ error: 'Name must be at least 3 characters long' });
    }
    const response = await axios.get(`${API_BASE}/clans?${params}`, {
      headers: { Authorization: `Bearer ${process.env.COC_API_KEY}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error('SEARCH ERROR:', error.response?.status, error.response?.data);
    res.status(error.response?.status || 500).json({ error: error.response?.data || 'Search failed' });
  }
});

// 2. Get clan info - FIXED
router.get('/:clanTag', async (req, res) => {
  try {
    console.log('🔍 Input tag:', req.params.clanTag);
    
    // ✅ CORRECT: Always URL encode with # included OR add %23 prefix
    let clanTag = req.params.clanTag;
    if (!clanTag.startsWith('#') && !clanTag.startsWith('%23')) {
      clanTag = `#${clanTag}`;  // Add # back
    }
    const encodedTag = encodeURIComponent(clanTag);  // #2LYPQQLG9 → %232LYPQQLG9
    
    console.log('📡 Final API tag:', encodedTag);
    console.log('📡 API URL:', `${API_BASE}/clans/${encodedTag}`);
    
    const response = await axios.get(`${API_BASE}/clans/${encodedTag}`, {
      headers: { Authorization: `Bearer ${process.env.COC_API_KEY}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error('❌ ERROR:', error.response?.status, error.response?.data);
    res.status(error.response?.status || 500).json({ 
      error: `Clan not found (${error.response?.status})`,
      details: error.response?.data 
    });
  }
});

// 3. Clan members - FIXED  
router.get('/:clanTag/members', async (req, res) => {
  try {
    let clanTag = req.params.clanTag;
    if (!clanTag.startsWith('#') && !clanTag.startsWith('%23')) {
      clanTag = `#${clanTag}`;
    }
    const encodedTag = encodeURIComponent(clanTag);
    
    const response = await axios.get(`${API_BASE}/clans/${encodedTag}/members`, {
      headers: { Authorization: `Bearer ${process.env.COC_API_KEY}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data);
    res.status(error.response?.status || 500).json({ error: 'Members fetch failed' });
  }
});

// 4. Clan war log - FIXED
router.get('/:clanTag/warlog', async (req, res) => {
  try {
    let clanTag = req.params.clanTag;
    if (!clanTag.startsWith('#') && !clanTag.startsWith('%23')) {
      clanTag = `#${clanTag}`;
    }
    const encodedTag = encodeURIComponent(clanTag);
    
    const response = await axios.get(`${API_BASE}/clans/${encodedTag}/warlog`, {
      headers: { Authorization: `Bearer ${process.env.COC_API_KEY}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data);
    res.status(error.response?.status || 500).json({ error: 'War log fetch failed' });
  }
});


module.exports = router;
