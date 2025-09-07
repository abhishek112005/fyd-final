import User from "../modles/user.js"

// Create or update user (for Clerk webhook)
export const createOrUpdateUser = async (req, res) => {
  try {
    const { clerkId, name, email, role = 'patient' } = req.body;
    
    if (!clerkId || !name || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const user = await User.findOneAndUpdate(
      { clerkId },
      { name, email, role },
      { upsert: true, new: true, runValidators: true }
    );
    
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const clerkId = req.auth.userId;  // From Clerk middleware
    
    const user = await User.findOne({ clerkId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { name, email, role } = req.body;
    
    const user = await User.findOneAndUpdate(
      { clerkId },
      { name, email, role },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};