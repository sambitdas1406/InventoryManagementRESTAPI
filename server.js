var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'root', //mysql database user name
  password : 'sambit', //mysql database password
  database : 'productmanagement' //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3000,  "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});


//rest api to create a new record into mysql database
app.post('/api/product', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO productmanagement.product SET ?', postData, function (error, results, fields) {
	  if (error) throw error;
    //res.end(JSON.stringify(results));
    res.status(200).json({msg:"data successfully a inserted "});
	});
});
//rest api to get all results
app.get('/api/product', function (req, res) {
  connection.query('select * from productmanagement.product', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//rest api to get a single productmanagement.product data
app.get('/api/product/:id', function (req, res) {
  console.log(req);
  connection.query('select * from productmanagement.product where id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
//rest api to update record into mysql database
app.put('/api/product', function (req, res) {
  console.log(req);
  connection.query('UPDATE productmanagement.product SET `name`=?,`price`=?,`rating`=? where `id`=?', [req.body.name,req.body.price, req.body.rating, req.body.id], function (error, results, fields) {
   if (error) throw error;
   res.status(200).json({msg:"data successfully a updated "});
 });
});

//rest api to delete record from mysql database
app.delete('/api/product/:id', function (req, res) {
  console.log(req.params.id);
  connection.query('DELETE FROM productmanagement.product  WHERE `id`=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.status(200).json({msg:"data successfully a deleted "});

 });
});
