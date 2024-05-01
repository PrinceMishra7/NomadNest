const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  birthdate: {
    type: Date,
  
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
   
  },
  locationText: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
