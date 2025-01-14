import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, unique: true, required: true },
});

const User = mongoose.model('User', userSchema);
export default User;
