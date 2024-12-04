import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  age: {
    type: Number,
    required: [true, 'Please provide your age'],
  },
  weight: {
    type: Number,
    required: [true, 'Please provide your weight'],
  },
  height: {
    type: Number,
    required: [true, 'Please provide your height'],
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Please specify your gender'],
  },
  activityLevel: {
    type: String,
    enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
    required: [true, 'Please specify your activity level'],
  },
  goal: {
    type: String,
    enum: ['weight_loss', 'muscle_gain', 'maintenance'],
    required: [true, 'Please specify your goal'],
  },
  progressHistory: [{
    date: Date,
    weight: Number,
    measurements: {
      chest: Number,
      waist: Number,
      hips: Number,
      arms: Number,
      legs: Number,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
