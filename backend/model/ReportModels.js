
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  project_name: {
    type: String,
    required: true,
  },
  status_update: {
    type: String,
    required: true,
  },
  obstacles: {
    type: String,
    enum: ['On Track', 'At Risk', 'Off Track'],
  },
  needs_clarification: {
    type: String,
    enum: ['Yes', 'No'],
  },
 
  plans: {
    type: String,
  },
  attachment: {
    type: String, 
  },
});


module.exports = mongoose.model('Report', reportSchema);
