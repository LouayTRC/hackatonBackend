const mongoose = require('mongoose');

const workerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skills: [{
    technology: { type: String },
    level: { type: String }
  }],
}, { versionKey: false,timestamps: true });

module.exports = mongoose.model('Worker', workerSchema);
