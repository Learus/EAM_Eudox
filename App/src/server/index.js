const express = require('express');
const os = require('os');
const mysql = require('mysql');

const bodyParser = require('body-parser');
const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json())

app.get('/api/getUsername', function(req, res)  {
    // console.log(req);
    const connection = connect();
    connection.connect();
    
    connection.query("Select Username From User", function (err, rows, fields) {
        if (err) throw err;
        // console.log(rows);
        res.send({username: rows[0].Username});
    })
    
    connection.end();

});


app.post('/api/Login', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    const connection = connect();
    connection.connect();

    const query = "Select * From User Where Username = '" + username + "' and Password = '" + password + "';"
    
    connection.query(query, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Wrong Username or Password"});
        }
        else {
            res.send({error: false, message: "OK", data: rows[0] });
        }
    })
    
    connection.end();
})


app.post('/api/getUniversities', function (req, res) {
    const connection = connect();
    connection.connect();

    const query = "Select * From University";

    connection.query(query, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"})
        }
        else {
            res.send({error: false, message: "OK", data: rows});
        }
    })
})

app.post('/api/getDepartments', function (req, res) {
    const connection = connect();

    const uni = req.body.university;

    const query = "Select * From University_Department Where University_Id = " + uni;

    connection.query(query, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"})
        }
        else {
            res.send({error: false, message: "OK", data: rows});
        }
    })
})

app.listen(8080, () => console.log('Listening on port 8080!'));


function connect() {
    return ( mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydb'
    }) );
}
