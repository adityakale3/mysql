const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));

var conn = mysql.createConnection({
    host: 'localhost',
    user:"root",
    password:"",
    database:'test' 
});

conn.connect((err) => {
    if(err) { console.log(err); }
    console.log('DB Connected');
});

// Routing
app.get('/', (req,res) => {
    var getQuery = "SELECT * FROM employee";
    conn.query(getQuery, (err,result) => {
        if(err) throw err;
        res.render('index', {success:'', records : result});
    });

});

app.post('/',urlencodedParser, (req,res) => {

    var name = req.body.name;
    var email = req.body.email
    var type = req.body.type
    var horus = req.body.hours
    var rate = req.body.rate

    var query = `INSERT INTO employee (name,email,type,hours,rate) VALUES('${name}','${email}','${type}','${horus}','${rate}')`;
    conn.query(query, (err,result) => {
        if(err){
            throw err;
        } 
        console.log(result);
        var getQuery = "SELECT * FROM employee";
        conn.query(getQuery, (err,result) => {
            if(err) throw err;
            res.render('index', {success:'', records : result});
        });
    });

});

app.listen(3000, () => {
    console.log('Server Up and Running');
})