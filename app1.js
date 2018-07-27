var express = require("express"); // call express to be used by the application.
var app = express();
const path = require('path');
const VIEWS = path.join(__dirname, 'views');


app.use(express.static("scripts")); // allow the application to access the scripts folder contents to use in the application
app.use(express.static("images")); // allow the application to access the images folder contents to use in the application
app.use(express.static("views")); // Allow access to content of views folder

var mysql = require('mysql');
const db = mysql.createConnection({
  host     : 'den1.mssql3.gear.host',
  user     : 'emertest',
  password : 'Fk732EQ?XAt?',
  database : 'emertest'
});

db.connect((err) => {
  if(err){
    //throw err;
    console.log("db connect broke", err);
  }else{
    console.log("Getting there liam connected to gearhost DB...");
  }
});

// SQL create table Example
app.get('/createitems', function(req, res) {
  let sql = 'CREATE TABLE items ( Id int, Name varchar(255), Price varchar(255));';
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log("cant create item table", res);
  });
  res.send("Well done Emer, items table created...");
});


// SQL create table Example
app.get('/createproducts', function(req, res) {
  //let sql = 'DROP TABLE products;';

  let sql = 'CREATE TABLE products ( Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Price int, Image varchar(255),Activity varchar(255));'
    console.log();
    let query = db.query(sql, (err, res) => {
      if(err) throw err;
        console.log("cant create product table", res);
      });
    res.send("Well done products table created...");
});

app.get('/insertproduct', function(req, res) {
  let sql = 'INSERT INTO products (Name, Price, Image, Activity) VALUES ("Polar M400", 199, "polarm400.png", "Running")'
    let query = db.query(sql, (err, res) => {
      if(err) throw err;
      console.log(res);
      
      
    });
  res.send("Product Created and inserted to table...");
});



app.get('/makeme', function(req, res) {
  let sql = 'INSERT INTO items ( Id, Name, Price) VALUES (1, "Emer", "1000");'; 
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
  });
  res.send("Well done Emer, item created...");
});

app.get('/shoeme', function(req, res) {
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
    if(err.fatal)
            db.connect;

    res.render('products.jade', {root: VIEWS,res1});
    console.log(res1);
  });
  
  console.log("Now you are on the products page!");
});

 
// function to set up a simple hello response 


// function to render the home page
app.get('/', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('index.jade', {root: VIEWS});
  console.log("Now you are home!");
});

// function to render the products page
app.get('/products', function(req, res){
 // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered
  res.render('products.jade', {root: VIEWS}); // use the render command so that the response object renders a HHTML page
  console.log("Now you are on the products page!");
});




// We need to set the requirements for the application to run

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("App is Running ......... Yessssssssssssss!");
});

