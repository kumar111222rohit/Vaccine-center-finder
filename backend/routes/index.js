var express = require('express');
var router = express.Router();
var newsController=require('../controller/newsController.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET latest news for UK */
router.get('/news',newsController.getLatestNewsFromUK.bind(newsController))

module.exports = router;
