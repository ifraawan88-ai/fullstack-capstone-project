const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("./db");

// GET all gifts
router.get("/api/gifts", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection("gifts").find({}).toArray();
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET gift by ID
router.get("/api/gifts/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gift = await db.collection("gifts").findOne({
      id: req.params.id
    });

    if (!gift) {
      return res.status(404).json({ message: "Gift not found" });
    }

    res.json(gift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
