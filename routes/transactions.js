var express = require('express');
var router = express.Router();
var fs = require('fs');

/* POST users listing. */
router.post('/create', function (req, res, next) {

  var date = req.body.date;
  var categories = req.body.categories;
  var ammount = req.body.ammount;

  var content = fs.readFileSync('public/data/transactions.json');
  var transactions = JSON.parse(content);

  transactions.push({
    date,
    categories,
    ammount,
  });

  content = JSON.stringify(transactions, null, 2);
  fs.writeFileSync('public/data/transactions.json', content);

  res.json({ sucess: true });

  res.redirect('/index.html');

});

module.exports = router;
