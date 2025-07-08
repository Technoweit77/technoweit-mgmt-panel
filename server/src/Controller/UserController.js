import { User } from "../Models/UserSchema.js";

// Create a new user
const createUser = async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.status(200).json({
      data: result,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { userId, updateData } = req.body;

    const result = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.status(200).json({
      data: result,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await User.findByIdAndDelete(userId);

    res.status(200).json({
      data: result,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { createUser, fetchAllUsers, updateUser, deleteUser };