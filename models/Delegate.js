var mongoose = require("mongoose");

var baseDelegateSchema = new mongoose.Schema({
	delegateType: String,
	address: {
		country: String,
		city: String,
		locality: String
	},
	email: {
		type : String,
		required : true
	},
	firstname: String,
	middlename: String,
	lastname: String,
	gender: String,
	institution: String,
	mmcNo: String,
	contactNo: {
		type : String,
		required : true
	},
	regFees: String,
	username: String,
	password: String,
    avatar: {
        type: String
    }
});

module.exports = mongoose.model("Delegate", baseDelegateSchema);
