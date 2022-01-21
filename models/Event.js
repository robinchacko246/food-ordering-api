const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    img: {
      type: String,
      required: true,
    },
 
   
  },
  { timestamps: true }
);

module.exports = {Event: mongoose.model('event', EventSchema )};