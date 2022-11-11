'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok('Aplikasi REST API berhasil di eksekusi',res);
};


//menampilkan semua data pada database
exports.user = function(req,res){
    connection.query('SELECT * FROM user',
    function (error, rows, fields) {
        if (error) {
            connection.log(error);
        }else{
            response.ok(rows,res)
        }
    });
};

//menampilkan semua data sesuai Id user
exports.userwithid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM user WHERE id = ?',[id],
    function (error, rows, fields) {
        if (error) {
            console.log(error);
        }else{
            response.ok(rows,res)
        }
    });
};

//menambahkan data 
exports.adduser = function(req,res){
        var nama = req.body.nama;
        var email = req.body.email;
        var password = req.body.password;

    connection.query('INSERT INTO user (nama,email,password) VALUES (?,?,?)',[nama,email,password],
    function (error, rows, fields) {

        if (error) {
            console.log(error);
        }else{
            response.ok("Berhasil Menambahkan Data !",res)
        }
    });
};

//update data sesuai Id user
exports.update = function(req,res){
    var id = req.body.id;
    var nama = req.body.nama;
    var email = req.body.email;
    var password = req.body.password;

    connection.query('UPDATE user set nama=?, email=?, password=? WHERE id=?',[nama,email,password,id],
    function (error, rows, fields) {
        if (error) {
            console.log(error);
        }else{
            response.ok("Berhasil Mengubah Data !",res)
        }
    });
};


exports.delete = function(req,res){
    var id = req.body.id;
    connection.query('DELETE FROM user WHERE id = ?',[id],
    function (error, rows, fields) {
        if (error) {
            console.log(error);
        }else{
            response.ok("Berhasil Menghapus Data !",res)
        }
    });
}