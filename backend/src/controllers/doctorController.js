import Doctor from '../modles/doctor.js';
import User from '../modles/user.js';

// Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate('userId', 'name email')
      .sort({ rating: -1 });
    
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const doctor = await Doctor.findById(id)
      .populate('userId', 'name email')
      .populate('reviews.userId', 'name');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create doctor profile
export const createDoctor = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    
    // Check if user exists and is a doctor
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.role !== 'doctor') {
      return res.status(400).json({ message: 'User must have doctor role' });
    }
    
    // Check if doctor profile already exists
    const existingDoctor = await Doctor.findOne({ userId: user._id });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor profile already exists' });
    }
    
    const doctorData = {
      userId: user._id,
      ...req.body
    };
    
    const doctor = new Doctor(doctorData);
    await doctor.save();
    
    await doctor.populate('userId', 'name email');
    res.status(201).json(doctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update doctor profile
export const updateDoctor = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const doctor = await Doctor.findOneAndUpdate(
      { userId: user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'name email');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    res.json(doctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search doctors
export const searchDoctors = async (req, res) => {
  try {
    const { specialization, minFees, maxFees, hospital, minRating } = req.query;
    
    let query = {};
    
    if (specialization) {
      query.specialization = { $regex: specialization, $options: 'i' };
    }
    
    if (hospital) {
      query.hospital = { $regex: hospital, $options: 'i' };
    }
    
    if (minFees || maxFees) {
      query.fees = {};
      if (minFees) query.fees.$gte = Number(minFees);
      if (maxFees) query.fees.$lte = Number(maxFees);
    }
    
    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }
    
    const doctors = await Doctor.find(query)
      .populate('userId', 'name email')
      .sort({ rating: -1 });
    
    res.json(doctors);
  } catch (error) {
    console.error('Error searching doctors:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add review to doctor
export const addReview = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const clerkId = req.auth.userId;
    const { rating, comment } = req.body;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Check if user already reviewed this doctor
    const existingReview = doctor.reviews.find(
      review => review.userId.toString() === user._id.toString()
    );
    
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this doctor' });
    }
    
    doctor.reviews.push({
      userId: user._id,
      rating,
      comment
    });
    
    // Recalculate average rating
    const totalRating = doctor.reviews.reduce((sum, review) => sum + review.rating, 0);
    doctor.rating = totalRating / doctor.reviews.length;
    
    await doctor.save();
    
    await doctor.populate('reviews.userId', 'name');
    res.json(doctor);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};