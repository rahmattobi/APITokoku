'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok('Aplikasi REST API berhasil di eksekusi',res);
};


//menampilkan semua data pada database
exports.user = function(req,res){
    connection.query('SELECT * FROM user', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        }else{
            response.ok(rows,res)
        }
    });
};