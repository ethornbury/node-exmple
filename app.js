var express = require("express"); // call express to be used by the application.
var app = express();
const path = require('path');
const VIEWS = path.join(__dirname, 'views');


app.use(express.static("scripts")); // allow the application to access the scripts folder contents to use in the application
app.use(express.static("images")); // allow the application to access the images folder contents to use in the application
app.use(express.static("views")); // Allow access to content of views folder

//my gearhost MYSQL db credentials to create a connection
var mysql = require('mysql');
const db = mysql.createConnection({
  host     : 'den1.mysql4.gear.host',
  user     : 'emernode',
  password : 'Jt55Wlv-2a2-',
  database : 'emernode'
});

//Using the db above to connect to gearhost db
db.connect((err) => {
  if(err){
    //throw err;
    console.log("db connect broke", err);
  }else{
    console.log("Getting there liam, connected to gearhost DB...");
  }
});

//w3schools db connect
app.get('/usertable', function(req, res){
	  var sql = "CREATE TABLE users (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))";
	  db.query(sql, function (err, result) {
  		if (err) throw err;
  		console.log("Result for user table: " + result);
	  });
	  res.render('index.jade', {root: VIEWS});
});

// SQL create table Example
app.get('/createitems', function(req, result) {
  let sql = 'CREATE TABLE items ( Id int, Name varchar(255), Price varchar(255));';
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log("REsult for items table: " + result);
  });
  //result.send("Well done Emer, items table created...");
  result.render('index.jade', {root: VIEWS});
});


// SQL create table Example
app.get('/createproducts', function(req, res) {
  //let sql = 'DROP TABLE products;';

  let sql = 'CREATE TABLE products ( Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Price int, Image varchar(255), Activity varchar(255));'
    let query = db.query(sql, (err, res) => {
      if(err) throw err;
       console.log(res);
      });
    res.send("Well done products table created...");
});

app.get('/insertproduct', function(req, res) {
  let sql = 'INSERT INTO products (Name, Price, Image, Activity) VALUES ("Polar M400", 199, "polarm400.png", "Running")'
    let query = db.query(sql, (err, res) => {
      if(err) throw err;
      console.log(res);
      
      
    });
  //res.send("Product Created and inserted to table...");
  res.render('products.jade', {root: VIEWS}); // use the render command so that the response object renders a HHTML page
  console.log("Now you are on the products page!");
  
});



app.post('/new-product', function(req, res) {
  
  let sql = 'INSERT INTO products ( Name, Price, Image, Activity) VALUES ("'+req.product.body.name+'", "'+req.body.price+'", "'+req.body.image+'", "'+req.body.activity+'")'; 
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
  });
  res.send("Well done Emer, item created...");
  
});

app.get('/showme', function(req, res) {
  let sql = 'SELECT * FROM products;'; 
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
  });
  res.send("Look in console");
});

app.get('/sproducts', function(req, res){
 let sql = 'SELECT * FROM products'
 let query = db.query(sql, (err, res1) => {
    if(err) throw err;
    res.render('products.jade', {root: VIEWS,res1});
    //res.send(res1); //showa table contents but needs style
    console.log(res1);
  });
  console.log("Now you are on the products page!");
});

// function to render the products page
app.get('/show/:id', function(req, res){
 let sql = 'SELECT * FROM products WHERE Id = "'+req.params.id+'"'
  let query = db.query(sql, (err, res1) => {
    if(err) throw err;
    console.log(res1);
    res.render('show', {root: VIEWS,res1});
  });
  console.log("Now you are on the products page!");
});


 
// ------------------ functions to render views

// function to render the home page
app.get('/', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('index.jade', {root: VIEWS}); //render() will show the .jade as HTML
  console.log("Now you are home!");
});

// function to render the products page
app.get('/products', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('products.jade', {root: VIEWS}); // use the render command so that the response object renders as a HTML page
  console.log("Now you are on the products page!");
});

// function to render the products page
app.get('/new-product', function(req, res){
  res.render('new-product.jade', {root: VIEWS}); // use the render command so that the response object renders a HHTML page
  console.log("Now you are on the new product page!");
});


// -------------------- We need to set the requirements for the application to run

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("App is Running ......... Yessssssssssssss!");
});

