var mongoose=require('mongoose');

var usersSchema=mongoose.Schema({
	fname:{
		type:String,
		required:true
	},
	lname:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	}
});
var Users=module.exports=mongoose.model('Users',usersSchema);