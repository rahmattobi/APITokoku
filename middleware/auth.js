var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');


//controller untuk register
exports.registrasi = function(req,res) {
    var post = {
        nama: req.body.nama,
        email: req.body.email,
        password: md5(req.body.password),
    }

    var query = "SELECT email FROM ?? WHERE ?? =?";
    var table = ["user", "email", post.email];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows) {
        if (error) {
            console.log(error);
        }else{
            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query,table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    }else{
                        response.ok("Berhasil menambahkan data user baru",res)
                    }
                });
            }else{
                response.ok("Email Sudah Terdaftar!",res);
            }
        }
    })

}


