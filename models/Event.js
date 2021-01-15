const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title.'],
    unique: true,
    trim: true,
    maxlength: [40, 'Title cannot be mor ethan 40 characters.']
  },
  day: {
    type: String,
    required: [true, 'Please add a day.'],
    trim: true
  },
  startTime: {
    type: String,
    required: [true, 'Please add a start time.'],
    trim: true
  },
  endTime: {
    type: String,
    required: [true, 'Please add an end time.'],
    trim: true
  }
})

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema)
