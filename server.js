var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto=require('crypto');


var app = express();
app.use(morgan('combined'));

// *****************************************************************
// ********************     config for db   ************************
// *****************************************************************
var Pool=require('pg').Pool;
var config={
user:'mpmanohar',
database:'mpmanohar',
host:'db.imad.hasura-app.io',
port:'5432',
password:'db-mpmanohar-60798'
};


var pool = new Pool(config);


// *****************************************************************
// ********************     main section    ************************
// *****************************************************************

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/lyrics', function (req, res) {
  res.sendFile(path.join(__dirname, 'lyrics', 'index.html'));
});

app.get('/mudras', function (req, res) {
  res.sendFile(path.join(__dirname, 'mudras', 'index.html'));
});

function hash(input, salt) {
    return crypto.pbkdf2Sync(input,salt,10,512,'sha512').toString('hex');
}

app.get('/hash/:input', function (req, res) {
  var hashedString=hash(req.params.input, 'mysalt');
  var dbString="insert into \"user\" values('" + req.params.input + "','" + hashedString + "');";
  pool.query(dbString, function (err,result){
      if (err){
          res.status(500).send(err.toString());
      } else{
          res.send(hashedString);
      }
    });
  
});

// *****************************************************************
// ********************     section : maths START ******************
// *****************************************************************

app.get('/multiply', function (req, res) {
  res.sendFile(path.join(__dirname, 'maths/multiply', 'index.html'));
});

app.get('/maths/multiply/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'maths/multiply', 'main.js'));
});

app.get('/maths/multiply', function (req, res) {
  res.sendFile(path.join(__dirname, 'maths/multiply', 'index.html'));
});

// *****************************************************************
// ********************     section : maths END   ******************
// *****************************************************************


app.get('/bala', function (req, res) {
  res.sendFile(path.join(__dirname, 'bala', 'index.html'));
});

app.get('/test-db', function (req, res) {
  // get and return data from db
  console.log('dbcall');
  pool.query('SELECT * from test', function (err,result){
      if (err){
          res.status(500).send(err.toString());
      } else{
          res.send(JSON.stringify(result.rows));
      }
    });
 });

var counter=0;
app.get('/counter', function(req,res) {
   counter++;
   res.send(counter.toString());
});


var names=[];
app.get('/submit-name/:name', function(req,res) {
   var name=req.params.name;
   names.push(name);
   res.send(JSON.stringify(names));
});

var names=[];
app.get('/mudras/:name', function(req,res) {
    res.sendFile(path.join(__dirname, 'mudras', req.params.name));
});

app.get('/submit-name', function(req,res) {
   var name=req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});

app.get('/getlyric', function(req,res) {
    var myfile=req.query.myfile;
    res.sendFile(path.join(__dirname, 'lyrics', myfile));
});

app.get('/a1', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index1.html'));
});

app.get('/a2', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index2.html'));
});

app.get('/a3', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index3.html'));
});

app.get('/a4', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index4.html'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
