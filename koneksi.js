var mysql = required('mysql');

// koneksi database

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tokoku'
});

conn.connect((err)=> {
    if (err) throw err;
    console.log('Mysql Terkoneksi');
});


module.exports = conn;