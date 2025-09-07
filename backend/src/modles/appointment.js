import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed'],
    default: 'booked'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;