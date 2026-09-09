const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("./db");

router.get("/api/search", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { category } = req.query;

    const filter = category ? { category: category } : {};

    const results = await db
      .collection("gifts")
      .find(filter)
      .toArray();

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
