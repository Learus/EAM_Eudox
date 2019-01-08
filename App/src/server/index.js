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
app.post('/api/getDepartmentData', require('./university').getDepartmentData)
app.post('/api/getUserUniversityData', require('./university').getUserUniversityData);

app.post('/api/getStudentApplications', require('./application').getStudentApplications)
app.post('/api/getTextbookApplication', require('./application').getTextbookApplication)
app.post('/api/createTextbookApplication', require('./application').createTextbookApplication)


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
        else res.send({error: false, message: "OK"});
    })

})

app.post('/api/updateStudentDetails', function(req, res) {
    console.log(req.body);

    sql.query("Update Student Set Student_Id= ?, Personal_Id= ?, Phone= ? Where Username= ?",
        [req.body.sid, req.body.pid, req.body.phone, req.body.username],
        function(err) {
            if(err) throw err;
        });
})

app.post('/api/updatePublisherDetails', function(req, res) {

    let oldAddressId = null;
    let deleteOldAddress = false;

    console.log(req.body);

    sql.query("Select Address_Id From Publisher Where Username= ?", [req.body.username], function(err, rows, fields) {
        if(err) throw err;
        
        oldAddressId = rows[0].Address_Id;

        sql.query(  "Select 1 From Publisher as p, Distribution_Point as dp, Address as a \
                    Where p.Username != ? AND ( p.Address_Id= a.Id OR dp.Address_Id= a.Id) and a.Id = ?", 
                    [req.body.username, oldAddressId], function(err, rows1, fields) {
                
                if(err) throw err;
                    
                if(rows1.length === 0)
                    deleteOldAddress = true;

        });

        sql.query("Select Id From Address Where City= ? AND Zipcode= ? AND Street_Name= ? AND Street_Number= ?",
            [req.body.city, req.body.zipcode, req.body.street, req.body.street_number], function(err, addressIds) {
                if(err) throw err;
                
                if(addressIds.length === 0)
                {
                    sql.query(  "Insert into mydb.Address (City, ZipCode, Street_Name, Street_Number) \
                                Values  (?, ?, ?, ?)",
                                [req.body.city, req.body.zipcode, req.body.street, req.body.street_number],
                                function(err) { 
                                    if (err) throw err;
                                    
                                    sql.query(  "SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES \
                                                WHERE TABLE_SCHEMA = 'mydb' AND TABLE_NAME = 'Address'",
                                                function(err, autoIncId) {
                                                    if(err) throw err;
                                                    console.log("if", autoIncId[0].AUTO_INCREMENT - 1);
                                                    updatePublisher(res, req, {
                                                        delete: deleteOldAddress,
                                                        oldAddressId: deleteOldAddress ? oldAddressId : null,
                                                        newAddressId: autoIncId[0].AUTO_INCREMENT - 1
                                                    })
                                                })
                                });
                }
                else
                {
                    console.log("else", addressIds[0].Id)
                    updatePublisher(res, req, {
                        delete: deleteOldAddress,
                        oldAddressId: deleteOldAddress ? oldAddressId : null,
                        newAddressId: addressIds[0].Id
                    })
                }
            })
    });
})

function updatePublisher(res, req, options) {
    console.log(options);
    sql.query   ("Update Publisher Set Name= ?, Phone= ?, Address_Id= ? Where Username= ?",
                [req.body.name, req.body.phone, options.newAddressId, req.body.username],
                function(err, rows, fields) {
                    console.log("updatepub")
                    if(err) throw err;

                    if(options.delete)
                    {
                        sql.query("Delete FROM Address Where Id = ?", [options.oldAddressId], function( err ) {
                            console.log("delete")
                            if(err) throw err;
                            res.send( {error: false, message: "OK" } );
                        });
                    }
                    else
                        res.send( {error: false, message: "OK" } );

                });
}

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

