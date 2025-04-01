const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  Title: {
    type: String,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
  Tag: {
    type: String,
    require: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notes", NotesSchema);