const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    "title": String,
    "elapsed": {
        type: Number,
        default: 0
    },
    "id": {
      type: String,
      unique: true,
      index: true
    },
    "runningSince": {
      type: Number,
      default: null
    }
})

module.exports = mongoose.model('Timer', schema)
