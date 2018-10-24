const express = require('express');
const router = express.Router();
const videoStream = require('../services/videoStream/videoStream.routes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'yevadu 3 movie' });
});

router.use('/video', videoStream);

module.exports = router;
