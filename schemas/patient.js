import mongoose from "mongoose";
const produitschema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  heure: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const Patient = mongoose.model("patient", produitschema);
export default Patient;
