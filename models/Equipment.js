const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  availableQuantity: {
    type: Number,
    required: true,
  },

  condition: {
    type: String,
    default: "Good",
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Equipment", equipmentSchema);