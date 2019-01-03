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

        console.log(rows);

        if (rows.length === 0) {
            res.send({error: true, message: "Something went wrong"});
        }
        else {
            res.send({error: false, message: "OK", data: rows[0]});
        }
    })

});

app.post('/api/getTypeData', function(req, res) {

    sql.query("Select * From ?? Where Username = ?", [req.body.type, req.body.username], function (err, rows, fields) {
        if(err) throw err;

        if(rows.length === 0) {
            res.send( {error: true, message: "Something went wrong"} );
        }
        else {
            res.send( {error: false, message: "OK", data: rows[0]} );
        }
    });
})

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


app.post('/api/getUniversities', function (req, res) {


    const query = "Select * From University";

    sql.query(query, function (err, rows, fields) {
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

    sql.query("Select * From University_Department Where University_Id = ?", [req.body.university], function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"})
        }
        else {
            res.send({error: false, message: "OK", data: rows});
        }
    })
})

app.post('/api/getDepartmentData', function (req, res) {

    sql.query("Select * From University_Department Where Id = ?", [req.body.udid],function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"})
        }
        else {
            res.send({error: false, message: "OK", data: rows[0]});
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

app.post('/api/updateUser', function(req, res) {

    let query = "Update User Set ";

    if(req.body.password)
    {
        query += ("Password='" + req.body.password + "'");
    }

    if(req.body.email)
    {
        query += ("Email='" + req.body.email +"'");
    }

    query += " Where Username='" + req.body.username + "'";

    console.log(query);

    sql.query(query, function(err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"})
        }
        else {
            res.send({error: false, message: "OK"});
        }
    })

})

app.post('/api/getAddress', function(req, res) {

    sql.query("Select * from Address Where Id= ?", [req.body.id], function(err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"})
        }
        else {
            res.send({error: false, message: "OK", data: rows[0] });
        }
    });
})

app.listen(8080, () => console.log('Listening on port 8080!'));
