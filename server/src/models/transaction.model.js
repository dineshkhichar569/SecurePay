import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type:{
    type:String,
    required:true,
  },
  description:{
    type:String
  },
  status: {
    type: String,
    enum: ["success", "failed", "suspicious"],
    default: "success",
  },
  isFraud: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
