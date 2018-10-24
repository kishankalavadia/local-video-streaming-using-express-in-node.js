const express = require('express');
const services = require('./videoStream.sevices');

const router = express.Router();

router.route('/view')
    .get(services.viewVideo)
router.route('/watch')
    .get(services.watchVideo)

module.exports = router;