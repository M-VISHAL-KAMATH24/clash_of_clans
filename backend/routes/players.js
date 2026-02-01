const express = require("express");
const axios = require("axios");

const router = express.Router();
const API_BASE = "https://api.clashofclans.com/v1";

/**
 * Helper: normalize & encode player tag
 * Accepts:
 *  - ABC123
 *  - #ABC123
 *  - %23ABC123
 * Always returns encoded %23ABC123
 */
const encodePlayerTag = (tag) => {
  let playerTag = tag;

  if (!playerTag.startsWith("#") && !playerTag.startsWith("%23")) {
    playerTag = `#${playerTag}`;
  }

  return encodeURIComponent(playerTag);
};

/**
 * 1️⃣ GET PLAYER INFO
 * GET /api/players/:playerTag
 */
router.get("/:playerTag", async (req, res) => {
  try {
    const encodedTag = encodePlayerTag(req.params.playerTag);

    const response = await axios.get(
      `${API_BASE}/players/${encodedTag}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.COC_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "PLAYER FETCH ERROR:",
      error.response?.status,
      error.response?.data
    );

    res.status(error.response?.status || 500).json({
      error: "Player not found",
      details: error.response?.data,
    });
  }
});

/**
 * 2️⃣ VERIFY PLAYER TOKEN
 * POST /api/players/:playerTag/verifytoken
 *
 * Body:
 * {
 *   "token": "API_TOKEN_FROM_GAME"
 * }
 */
router.post("/:playerTag/verifytoken", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        error: "Player API token is required",
      });
    }

    const encodedTag = encodePlayerTag(req.params.playerTag);

    const response = await axios.post(
      `${API_BASE}/players/${encodedTag}/verifytoken`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${process.env.COC_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "TOKEN VERIFY ERROR:",
      error.response?.status,
      error.response?.data
    );

    res.status(error.response?.status || 500).json({
      error: "Token verification failed",
      details: error.response?.data,
    });
  }
});

module.exports = router;
