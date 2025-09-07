import Appointment from '../modles/appointment.js';
import Doctor from '../modles/doctor.js';
import User from '../modles/user.js';

// Book appointment
export const bookAppointment = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { doctorId, date, notes } = req.body;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Check if appointment date is in the future
    const appointmentDate = new Date(date);
    if (appointmentDate <= new Date()) {
      return res.status(400).json({ message: 'Appointment date must be in the future' });
    }
    
    // Check for conflicting appointments
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: appointmentDate,
      status: 'booked'
    });
    
    if (existingAppointment) {
      return res.status(400).json({ message: 'Doctor is not available at this time' });
    }
    
    const appointment = new Appointment({
      userId: user._id,
      doctorId,
      date: appointmentDate,
      notes
    });
    
    await appointment.save();
    
    await appointment.populate([
      { path: 'userId', select: 'name email' },
      { path: 'doctorId', populate: { path: 'userId', select: 'name email' } }
    ]);
    
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's appointments
export const getUserAppointments = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const appointments = await Appointment.find({ userId: user._id })
      .populate([
        { path: 'userId', select: 'name email' },
        { path: 'doctorId', populate: { path: 'userId', select: 'name email' } }
      ])
      .sort({ date: 1 });
    
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const clerkId = req.auth.userId;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      userId: user._id
    });
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    if (appointment.status === 'cancelled') {
      return res.status(400).json({ message: 'Appointment is already cancelled' });
    }
    
    if (appointment.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel completed appointment' });
    }
    
    appointment.status = 'cancelled';
    await appointment.save();
    
    await appointment.populate([
      { path: 'userId', select: 'name email' },
      { path: 'doctorId', populate: { path: 'userId', select: 'name email' } }
    ]);
    
    res.json(appointment);
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get doctor's appointments
export const getDoctorAppointments = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const doctor = await Doctor.findOne({ userId: user._id });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    const appointments = await Appointment.find({ doctorId: doctor._id })
      .populate([
        { path: 'userId', select: 'name email' },
        { path: 'doctorId', populate: { path: 'userId', select: 'name email' } }
      ])
      .sort({ date: 1 });
    
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update appointment status (for doctors)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    const clerkId = req.auth.userId;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const doctor = await Doctor.findOne({ userId: user._id });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      doctorId: doctor._id
    });
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    appointment.status = status;
    await appointment.save();
    
    await appointment.populate([
      { path: 'userId', select: 'name email' },
      { path: 'doctorId', populate: { path: 'userId', select: 'name email' } }
    ]);
    
    res.json(appointment);
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

