var mysql = require('mysql');

var con = mysql.createConnection({
  host: "172.17.0.7",
  user: "sylvan",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});