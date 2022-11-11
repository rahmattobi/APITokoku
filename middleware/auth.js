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
    });
}

// controller login
exports.login = function(req, res) {
    let post = {
        password:req.body.password,
        email: req.body.email,
    }

    let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    let table = ["user","password", md5(post.password), "email", post.email];

    query = mysql.format(query,table);
    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        }else{
            if (rows.length == 1) {
                let token = jwt.sign({rows},config.secret,{
                    expiresIn: 1440
                });
                id_user = rows[0].id;
                email = rows[0].email;
                nama = rows[0].nama;

                let data = {
                    id_user: id_user,
                    email: email,
                    nama: nama,
                    // access_token: token,
                }

                res.json({
                            success:true,
                            message:'token JWT tergenerate!',
                            token:token,
                            currUser:data.id_user,
                            data: {email:email,nama:nama}
                        });

                // menyimpan data token ke db 
                
                // let query = 'INSERT INTO ?? SET ?';
                // let table = ['akses_token'];

                // query = mysql.format(query,table);
                
                // connection.query(data,function(error,rows) {
                //     if (error) {
                //         console.log(error);
                //     } else {
                //         res.json({
                //             success:true,
                //             message:'token JWT tergenerate!',
                //             token:token,
                //             currUser:data.id_user,
                //             data: {email:email,nama:nama}
                //         });
                //     }
                // });
            } else{
                res.json({"error":true,"Message":"Email atau Password salah!"});
            }
        }
    });
}





