var mongoose=require('mongoose');

var cartSchema=mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	price:{
		type:String,
		required:true
	},
	image:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	}
});
var Cart=module.exports=mongoose.model('Cart',cartSchema);