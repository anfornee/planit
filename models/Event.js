const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title.'],
    unique: true,
    trim: true,
    maxlength: [40, 'Title cannot be mor ethan 40 characters.']
  }
})

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema)
