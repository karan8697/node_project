var mongoose=require('mongoose');

var productsSchema=mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	publisher:{
		type:String,
		required:true
	},
	price:{
		type:String,
		required:true
	},
	desc:{
		type:String,
		required:true
	},
	category:{
		type:String,
		required:true
	},
	image:{
		type:String,
		required:true
	}
});
var Products=module.exports=mongoose.model('Products',productsSchema);