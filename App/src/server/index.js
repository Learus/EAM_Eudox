const express = require('express');
const os = require('os');
const mysql = require('mysql');

const bodyParser = require('body-parser');
const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json())

app.get('/api/getUsername', function(req, res)  {
    // console.log(req);
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydb'
    });
    
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

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydb'
    });
    
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

app.listen(8080, () => console.log('Listening on port 8080!'));



