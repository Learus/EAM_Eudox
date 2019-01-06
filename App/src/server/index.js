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


app.post('/api/getUniversities', require('./university').getUniversities)

app.post('/api/getDepartments', require('./university').getDepartments)

app.post('/api/getSemesters', require('./university').getSemesters)

app.post('/api/getCourses', require('./university').getCourses)

app.post('/api/getCourses/Semesters', require('./university').getCoursesBySemester)

app.post('/api/getTextbooks/Course', function (req, res) {
    const course = req.body.course;

    const query = ` Select t.*, p.*, c.Id, c.Name, c.Semester
                    From Textbook as t, Publisher as p, Course_has_Textbook as cht, Course as c
                    Where   cht.Textbook_id = t.Id and 
                            c.Id = ${course} and 
                            cht.Course_Id = c.Id and
                            p.Username = t.Publisher_Username`
    const options = {
        sql: query,
        nestTables: true
    }

    console.log(query);
    sql.query(options, function(err, rows, fields) {
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
    `Select t.*, p.*, c.Id, c.Name, c.Semester
     From Textbook as t, Course as c, Course_has_Textbook as cht, University_Department as ud, Publisher as p
     Where  t.Id = cht.Textbook_id and 
            c.Id = cht.Course_Id and 
            c.University_Department_Id = ud.Id and
            ud.Id = ${req.body.udp} and
            p.Username = t.Publisher_Username`;

    if (req.body.semester) 
        query += ` and c.Semester = ${req.body.semester}`;

    query += ' Order by c.Semester ASC, c.Id ASC'

    const options = {
        sql: query,
        nestTables: true
    }

    console.log(query);
    sql.query(options, function(err, rows, fields) {
      if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"})
        }
        else {
            res.send({error: false, message: "OK", data: rows});
        }
    });
})

app.post('/api/getDepartmentData', function (req, res) {

    sql.query("Select * From University_Department Where Id = ?", [req.body.udid],function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows[0]});
        }
    })
})

app.post('/api/getStudentApplications', function(req, res) {

    sql.query(  "Select Textbook_Application.* From Textbook_Application Where Textbook_Application.Id in \
                (Select Textbook_Application_Id \
                From Student_has_Textbook_Application \
                Where Student_Username= ?) Order By Date Desc",
                [req.body.username],
                function(err, applications, fields) {

        if (err) throw err;

        if (applications.length === 0) {
            res.send({error: true, message: "Empty set"})
        }
        else {
            
            res.send({error: false, message: "OK", data: applications});
        }
    })
})

app.post('/api/updateUser', function(req, res) {

    let query = "Update User Set ";

    if(req.body.password)
    {
        query += (`Password = '${req.body.password}'`);
    }

    if(req.body.email)
    {
        query += (`Email = '${req.body.email}'`);
    }

    query += ` Where Username = '${req.body.username}'`;

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

app.post('/api/createTextbookApplication', function(req, res) {
    const appl = req.body.new;

    const query = ` Insert into Textbook_Application (Date, Is_Current, PIN, Status)
                    Values (NOW(), TRUE, ${randomPIN()}, 'Pending')`;
    
    sql.query(query, function(err, rows) {
        if (err) throw err;

        res.send({error: false, message: "OK"});
    })
})

app.listen(8080, () => console.log('Listening on port 8080!'));

function randomPIN() {
    let result = '';
    for (let i = 16; i > 0; --i) {
        result += "0123456789"[Math.floor(Math.random() * 10)];
    }
    return result;
}