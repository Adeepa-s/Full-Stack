import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  birthday: String,
  age: Number,
  gender: String,
  email: String,
  password: String
}, {
  timestamps: true
});

const User = mongoose.model("users", userSchema);

export default User;