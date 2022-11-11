var express = require('express');
var auth = require('./auth');
var router = express.Router();

// daftarkan menu registrasi
router.post('/register',auth.registrasi);

module.exports = router;