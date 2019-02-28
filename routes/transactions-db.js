var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "buget_lunar"
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    const sql = "SELECT * FROM transactions";
    connection.query(sql, function(err, results) {
      if(err) throw err;
      console.log(results);
      res.json(results);
    })
  })
});

// /contacts/delete?id=3
router.get('/delete', function(req, res, next) {
  var id = req.query.id;

  pool.getConnection(function(err, connection) {
    if(err) throw err;
    const sql = `DELETE FROM transactions WHERE id=${id}`;
    connection.query(sql, function(err, results) {
      if(err) throw err;
      console.log(results);
      //res.json({success: true})
      res.redirect('/index.html');
    })
  })
});

// /contacts/create
router.post('/create', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    var date = req.body.date;
    var categories = req.body.categories;
    var ammount = req.body.ammount;
    const sql = `INSERT INTO transactions (id, date, categories, ammount) VALUES (NULL, "${date}", "${categories}", "${ammount}");`;
    
    console.log('query here: ', sql);
    
    connection.query(sql, function(err, results) {
      if(err) throw err;
      console.log(results);
      res.json({success: true});
    })
  });  
});

// /contacts/update
router.post('/update', function(req, res, next) {
  var id = req.body.id;
  var date = req.body.date;
  var categories = req.body.categories;
  var ammount = req.body.ammount;

  pool.getConnection(function(err, connection) {
    if(err) throw err;
    const sql = `UPDATE transactions SET date='${date}', categories="${categories}", ammount="${ammount}" WHERE id=${id};`;

    console.log('my query: ', sql);

    connection.query(sql, function(err, results) {
      if(err) throw err;
      console.log(results);
      res.json({success: true});
    })
  })
});


module.exports = router;