const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

mongoose.connect('mongodb://localhost/db_gamesite',{useUnifiedTopology:true});
var db=mongoose.connection;

//Check Connection
db.once('open',function(){
	console.log('Connected To MongoDB');
});

//Check for Database Error
db.on('error',function(err){
	console.log(err);
});

//Init App
const app=express();

//Include Products Model
var Products=require('./models/products')

//Include Users Model
var Users=require('./models/users')

//Include Cart Model
var Cart=require('./models/cart')

//Load View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Set Public Folder
app.use(express.static(path.join(__dirname,'public')));

//Home Route
app.get('/home',function(req,res){
	Products.find({},function(err,products){
	if(err){
		console.log(err);
	}
	else{
		//To Get all data From Products collection
		res.render('home',{
			products_1:products
		});//Rendering The Index Page and sending data	
	}	
	
	});
	
});
// Racing Page Route
app.get('/racing',function(req,res){
	Products.find({category: "racing"},function(err,products){
	if(err){
		console.log(err);
	}
	else{
		//To Get all data From Products collection
		res.render('category',{
			title:'Racing',
			products_2:products
		});//Rendering The Index Page and sending data	
	}	
	
	});
	
});
//Action Page Route
app.get('/action',function(req,res){
	Products.find({category: "action"},function(err,products){
	if(err){
		console.log(err);
	}
	else{
		//To Get all data From Products collection
		res.render('category',{
			title:'Action',
			products_2:products
		});//Rendering The Index Page and sending data	
	}	
	
	});
	
});
//Open World Route
app.get('/openworld',function(req,res){
	Products.find({category: "openworld"},function(err,products){
	if(err){
		console.log(err);
	}
	else{
		//To Get all data From Products collection
		res.render('category',{
			title:'Open World',
			products_2:products
		});//Rendering The Index Page and sending data	
	}	
	
	});
	
});
// Sports Page Route
app.get('/sports',function(req,res){
	Products.find({category: "sports"},function(err,products){
	if(err){
		console.log(err);
	}
	else{
		//To Get all data From Products collection
		res.render('category',{
			title:'Sports',
			products_2:products
		});//Rendering The Index Page and sending data	
	}	
	
	});
	
});

//Add Product Page Display
app.get('/upload',function(req,res){
	res.render('upload',{
		title:'Upload Product'
	});
});

app.get('/game',function(req,res){
	res.render('game',{
		title:'Upload Product'
	});
});

app.get('/register',function(req,res){
	res.render('register',{
		
	});
});

app.get('/',function(req,res){
	res.render('login',{
		
	});
});

app.post('/process', function(req,res){ 
	var email = req.body.email;
    var password = req.body.password;
    db.collection('users').findOne({email:email,password:password},function(err, users){ 
        if (err){
        	console.log(err);
        } 
        else
        {
        	if(email=='admin@email.com')
        	{
        		res.render('upload',{
				});
        	}
        	else
        	{
        		res.render('home',{
				});
        	}
        }
              
    }); 

});

//Game Page Route With Unique Product By Fetching ID
app.get('/game:id',function(req,res){
	Products.findById(req.params.id,function(err,products){
		res.render('game',{
			products:products
		});
	});

});

// Cart Page Route
app.get('/cart',function(req,res){
	Cart.find({},function(err,cart){
	if(err){
		console.log(err);
	}
	else{
			console.log(cart)
		//To Get all data From Products collection
		res.render('cart',{
			products_2:cart
		});//Rendering The Index Page and sending data	
	}	
	
	});
	
});

//Add Product Route Code
app.post('/upload',function(req,res){
	var products=new Products();
	products.name=req.body.name;
	products.publisher=req.body.publisher;
	products.price=req.body.price;
	products.desc=req.body.desc;
	products.category=req.body.category;
	products.image=req.body.image;
	products.save(function(err){
		if(err){
			console.log(err);
			return;
		}
		else{
			res.redirect('/home')
		}
	});
      
});

//Add Product Route Code
app.post('/adduser',function(req,res){
	var users=new Users();
	users.fname=req.body.fname;
	users.lname=req.body.lname;
	users.email=req.body.email;
	users.password=req.body.password;
	users.save(function(err){
		if(err){
			console.log(err);
			return;
		}
		else{
			res.redirect('/')
		}
	});
      
});

//Start Server
app.listen(3000,function(){
	console.log("Running At 3000");
})