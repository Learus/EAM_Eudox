const express = require('express');
const os = require('os');

const sql = require('./connection').initConnection();

const bodyParser = require('body-parser');
const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json())

app.post('/api/getUsername', function(req, res)  {
    console.log(req.body);
    
    sql.query("Select 1 From User Where Username = ?", [req.body.username],  function (err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        if (rows.length !== 0) {
            res.send({error: true, message: "Username already exists"});
        }
        else {
            res.send({error: false, message: "OK"});
        }
    })

});

app.post('/api/getUser', function(req, res)  {
    console.log(req.body);
    
    sql.query("Select * From User Where Username = ?", [req.body.username],  function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Something went wrong"});
        }
        else {
            res.send({error: false, message: "OK", data: rows[0]});
        }
    })

});


app.post('/api/Login', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    const query = "Select * From User Where Username = '" + username + "' and Password = '" + password + "';"
    
    sql.query(query, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Wrong Username or Password"});
        }
        else {
            res.send({error: false, message: "OK", data: rows[0] });
        }
    })
    
})

app.post('/api/Signup', require('./signup'))


app.post('/api/getUniversities', require('./university').getUniversities)

app.post('/api/getDepartments', require('./university').getDepartments)

app.post('/api/getSemesters', require('./university').getSemesters)

app.post('/api/getCourses', require('./university').getCourses)

app.post('/api/getCourses/Semesters', require('./university').getCoursesBySemester)

app.post('api/getTextbook', function (res, req) {
    
})

app.listen(8080, () => console.log('Listening on port 8080!'));
