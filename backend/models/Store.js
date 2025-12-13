import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 60 },
  address: { type: String, required: true, maxlength: 400 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Store", storeSchema);
