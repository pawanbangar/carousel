var mongoose = require("mongoose");

var confSchema = new mongoose.Schema({
  name: {
    type: String,
    	required: true
  },
  city: {
    type: String,
    	required: true
  },
  state: {
    type: String,
    	required: true
  },
  country: {
    type: String,
    	required: true
  },
  startDate: {
    type: Date,
    	required: true
  },
  endDate: {
    type: Date,
    	required: true
  },
  confTime: {
    type: Date,
    	required: true
  },
  expectedCreditPoints: Number,
  feesForDelegate: {
    type: Number,
    min: 0,
  },
  feesForPGDelegate: {
    type: Number,
    min: 0,
  },
  feesForFaculty: {
    type: Number,
    min: 0,
  },
  confTheme: String,
  welcomeLetter: String,
  allowedAttendees: [String],
  days: {
    //   lectures: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Lecture",
    //     },
    //  ],
  },
  nationalBody:String,
  overview:String
});

module.exports = mongoose.model("Conference", confSchema);
