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

app.post('/api/getTextbooks/Course', function (req, res) {
    const course = req.body.course;

    const query = ` Select * From Textbook as t, Course_has_Textbook as cht
                    Where cht.Textbook_id = t.Id and cht.Course_Id = ${course}`

    console.log(query);
    sql.query(query, function(err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows});
        }
    })
})

app.post('/api/getTextbooks', function (req, res) {

    let query = 
    `Select t.* 
     From Textbook as t, Course as c, Course_has_Textbook as cht, University_Department as ud
     Where  t.Id = cht.Textbook_id and 
            c.Id = cht.Course_Id and 
            c.University_Department_Id = ud.Id and
            ud.Id = ${req.body.udp}`;

    if (req.body.semester) 
        query += ` and c.Semester = ${req.body.Semester}`;

    console.log(query);
    sql.query(query, function(err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows});
        }
    })
})

app.post('/api/getStudentApplications', function(req, res) {
    const username = req.body.username;

    const query = "Select Textbook_Application.* From User, Textbook_Application Where User.Username='" + username + "' Order By Textbook_Application.Date Desc";
    console.log(query);
    sql.query(query, function(err, rows, fields) {
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
