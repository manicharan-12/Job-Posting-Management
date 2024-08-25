// models/Template.js
const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Template", templateSchema);
