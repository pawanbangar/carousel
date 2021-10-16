var mongoose = require("mongoose");

var lectureSchema = new mongoose.Schema({
	topicName:{
		type: String,
		required: true
	},
	timestart:{
		type: Date,
		required: true
	},
	timeend:{
		type: Date,
		required: true
	},
	speakersName: String,
	speakersCode: String,
	chairperson: {
		email: String,
		mmcNo: Number,
		mobileNo: String
	}
	
		
	
});

module.exports = mongoose.model("Lecture", lectureSchema);