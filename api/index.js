import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import { UserModel } from "./models/user.model.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

mongoose
  .connect("mongodb://127.0.0.1:27017/TestDB")
  .then(() => {
    console.log("Connection Successful");
  })
  .catch(() => {
    console.log("error");
  });

app.use("/api/auth", authRouter);

app.get("/", (res) => {
  res.send("Welcome to the home route");
});

// Example endpoint in Express.js
app.get('/api/users', async (req, res) => {
  try {
    const users = await UserModel.find(); // Assuming you have a User model
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params; // Get the user ID from the request parameters

  try {
    const user = await UserModel.findByIdAndDelete(id); // Attempt to find and delete the user
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Handle case where user doesn't exist
    }
    res.status(200).json({ message: 'User deleted successfully' }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message }); // Handle server errors
  }
});

// Assuming you're using Express.js
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    // Update user logic, e.g., using a MongoDB model
    const updatedUser = await UserModel.findByIdAndUpdate(id, { username, email }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
