import mongoose, { Schema } from 'mongoose';

const partySchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  /* visibility: {type: 'string', } */
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  activities: { type: String, required: true },
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  budget: { estimated: Number, actual: Number },
});

const Party = mongoose.model('Party', partySchema);
export default Party;
