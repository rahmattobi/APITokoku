var express = require('express');
var auth = require('./auth');
// const verifikasi = require('./verifikasi');
var router = express.Router();

// daftarkan menu registrasi
router.post('/register',auth.registrasi);
router.post('/login',auth.login);

//alamat yg perlu otorisasi
// router.get('/rahasia', verifikasi, auth.rahasia);

module.exports = router;