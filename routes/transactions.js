var express = require('express');
var router = express.Router();
var fs = require('fs');

// save
router.post('/create', function (req, res, next) {

  var date = req.body.date;
  var categories = req.body.categories;
  var ammount = req.body.ammount;
  var transId = req.body.transId;

  var content = fs.readFileSync('public/data/transactions.json');
  var transactions = JSON.parse(content);

  transactions.push({
    date,
    categories,
    ammount,
    transId
  });

  content = JSON.stringify(transactions, null, 3);
  fs.writeFileSync('public/data/transactions.json', content);

  res.json({ success: true });
});

// delete
router.get('/delete', function (req, res, next) { 

  var transId = req.query.transId;
  var content = fs.readFileSync('public/data/transactions.json');
  var transactions = JSON.parse(content);

  var remainingTransactions = transactions.filter(function (transaction) {
    return transaction.transId != transId;
  });

  content = JSON.stringify(remainingTransactions, null, 3);
  fs.writeFileSync('public/data/transactions.json', content);

  res.redirect('/index.html');;

});

module.exports = router;

