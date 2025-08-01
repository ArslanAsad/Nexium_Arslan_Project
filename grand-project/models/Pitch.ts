import mongoose, { Document, Model, Schema } from "mongoose";

interface IPitch extends Document {
  userId: string;
  content: string;
  createdAt: Date;
}

const PitchSchema: Schema = new Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Pitch: Model<IPitch> = mongoose.model<IPitch>("Pitch", PitchSchema);
export default Pitch;
