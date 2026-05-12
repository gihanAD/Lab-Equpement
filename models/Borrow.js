const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  borrowDate: {
    type: Date,
    default: Date.now,
  },

  returnDate: {
    type: Date,
  },

  status: {
    type: String,
    default: "borrowed",
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Borrow", borrowSchema);