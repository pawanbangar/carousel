var mongoose = require("mongoose");
var pharmaRepSchema = new mongoose.Schema({
	address:{
		type: String, 
		required: true
	},
	city: String,
	country: String,
	emailId:{
		type: String, 
		required: true
	},
	emailIdOfCompany:{
		type: String, 
		required: true
	},
	mobileNo: String,
	nameOfCompany: String,
	NameofRep: String,
	username: String,
	website: String,
	sponsershipPackages: String
});

module.exports = mongoose.model("PharmaRep", pharmaRepSchema);

