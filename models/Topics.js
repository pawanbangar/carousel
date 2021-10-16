var mongoose = require("mongoose");
var topicSchema = new mongoose.Schema({
	topicName: String,
	topicTime: Number,
	topicDate: Date
});

module.exports = mongoose.model("Topic", topicSchema);