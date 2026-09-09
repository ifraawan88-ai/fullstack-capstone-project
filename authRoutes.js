const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("./db");

// Register user
router.post("/api/register", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = db.collection("users");

    const { name, email, password } = req.body;

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const newUser = {
      name,
      email,
      password
    };

    const result = await users.insertOne(newUser);

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Login user
router.post("/api/login", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = db.collection("users");

    const { email, password } = req.body;

    // Find current user in database
    const user = await users.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Update user information
router.put("/api/users/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = db.collection("users");

    const { name, email } = req.body;

    const result = await users.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name,
          email
        }
      }
    );

    res.json({
      message: "User information updated",
      result
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
