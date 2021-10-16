var mongoose = require("mongoose");


var orgSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	nameOfSecr: String,
	mobileNoOfSecr: String,
	mmcNoOrg: String,
	noOfRegs:{
		type: Number,
		required: true
	},
	workshops:{
		type: Boolean,
		default: false
	},
	lectures:{
		type: Boolean,
		default: false
	},
	mailIdOfOrg:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	orgBody:{
		orgChairmen:[
			{
				nameOfChairman: String,
				img: {
					data: Buffer,
					contentType: String
				}
			}
		],
		orgComitteeMembers:[
			{
				nameOfComitteeMember: String,
				img: {
					data: Buffer,
					contentType: String
				}
			}
		],
		orgSecretaries:[
			{
				nameOfSecretary: String,
				img: {
					data: Buffer,
					contentType: String
				}
			}
		],
		orgTreasurers:[
			{
				nameOfTreasurer: String,
				img: {
					data: Buffer,
					contentType: String
				}
			}
		]
	},
	admin: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Admin"
		}
	},
	conferences: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Conference"
		}]
});
var Organization = mongoose.model("Organization", orgSchema);
//to upload an image file onto the Database
/*var org = new Organization;
org.img.data = fs.readFileSync(imgPath);
org.img.contentType = 'image/png';*/
module.exports = Organization;