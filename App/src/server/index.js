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
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
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
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

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
        if(err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

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
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

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
app.get('/api/getAllDepartments', require('./university').getAllDepartments)
app.post('/api/getSemesters', require('./university').getSemesters)
app.get('/api/getAllCourses', require('./university').getAllCourses);
app.post('/api/getCourses', require('./university').getCourses)
app.post('/api/getCourses/Semesters', require('./university').getCoursesBySemester)
app.post('/api/getDepartmentData', require('./university').getDepartmentData)
app.post('/api/getUserUniversityData', require('./university').getUserUniversityData);

app.post('/api/getStudentApplications', require('./application').getStudentApplications)
app.post('/api/getTextbookApplication', require('./application').getTextbookApplication)
app.post('/api/createTextbookApplication', require('./application').createTextbookApplication)

app.get('/api/getTextbooks', require('./search').getTextbooks)
app.get('/api/getTextbookNames', require('./search').getTextbookNames)
app.get('/api/getTextbookWriters', require('./search').getTextbookWriters)
app.get('/api/getTextbookISBNs', require('./search').getTextbookISBNs)
app.get('/api/getPublishers', require('./search').getPublishers)
app.get('/api/getDistributors', require('./search').getDistrbutionPoints)
app.get('/api/getKeywords', require('./search').getKeywords)
app.post('/api/searchTextbooks', require('./search').searchTextbooks);

app.get('/api/getPublisherNames', require('./search').getPublisherNames)
app.get('/api/getPublisherPhones', require('./search').getPublisherPhones)
app.get('/api/getPublisherStreets', require('./search').getPublisherStreets)
app.get('/api/getPublisherStreetNumbers', require('./search').getPublisherStreetNumbers)
app.get('/api/getPublisherZipcodes', require('./search').getPublisherZipcodes)
app.get('/api/getPublisherCities', require('./search').getPublisherCities)
app.post('/api/searchPublishers', require('./search').searchPublishers)


app.get('/api/getDistributorNames', require('./search').getDistributorNames)
app.get('/api/getDistributorPhones', require('./search').getDistributorPhones)
app.get('/api/getDistributorStreets', require('./search').getDistributorStreets)
app.get('/api/getDistributorStreetNumbers', require('./search').getDistributorStreetNumbers)
app.get('/api/getDistributorZipcodes', require('./search').getDistributorZipcodes)
app.get('/api/getDistributorCities', require('./search').getDistributorCities)
app.post('/api/searchDistributors', require('./search').searchDistributors)

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
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

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
      if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

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
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; }
        else res.send({error: false, message: "OK"});
    })

})

app.post('/api/updateStudentDetails', function(req, res) {
    console.log(req.body);

    sql.query("Update Student Set Student_Id= ?, Personal_Id= ?, Phone= ? Where Username= ?",
        [req.body.sid, req.body.pid, req.body.phone, req.body.username],
        function(err) {
            if(err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
        });
})

app.post('/api/updatePublisherDetails', function(req, res) {

    let oldAddressId = null;
    let deleteOldAddress = false;

    console.log(req.body);

    sql.query("Select Address_Id From Publisher Where Username= ?", [req.body.username], function(err, rows, fields) {
        if(err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
        
        oldAddressId = rows[0].Address_Id;

        sql.query(  "Select 1 From Publisher as p, Distribution_Point as dp, Address as a \
                    Where p.Username != ? AND ( p.Address_Id= a.Id OR dp.Address_Id= a.Id) and a.Id = ?", 
                    [req.body.username, oldAddressId], function(err, rows1, fields) {
                
                if(err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
                    
                if(rows1.length === 0)
                    deleteOldAddress = true;

        });

        sql.query("Select Id From Address Where City= ? AND Zipcode= ? AND Street_Name= ? AND Street_Number= ?",
            [req.body.city, req.body.zipcode, req.body.street, req.body.street_number], function(err, addressIds) {
                if(err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
                
                if(addressIds.length === 0)
                {
                    sql.query(  "Insert into mydb.Address (City, ZipCode, Street_Name, Street_Number) \
                                Values  (?, ?, ?, ?)",
                                [req.body.city, req.body.zipcode, req.body.street, req.body.street_number],
                                function(err) { 
                                    if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
                                    
                                    sql.query(  "SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES \
                                                WHERE TABLE_SCHEMA = 'mydb' AND TABLE_NAME = 'Address'",
                                                function(err, autoIncId) {
                                                    if(err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
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
                    if(err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

                    if(options.delete)
                    {
                        sql.query("Delete FROM Address Where Id = ?", [options.oldAddressId], function( err ) {
                            console.log("delete")
                            if(err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
                            res.send( {error: false, message: "OK" } );
                        });
                    }
                    else
                        res.send( {error: false, message: "OK" } );

                });
}

app.post('/api/getAddress', function(req, res) {

    sql.query("Select * from Address Where Id= ?", [req.body.id], function(err, rows, fields) {
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"})
        }
        else {
            res.send({error: false, message: "OK", data: rows[0] });
        }
    });
})

app.post('/api/getPublisherDetails', function(req, res) {

    sql.query("Select * from Publisher Where Username= ?", [req.body.username], function(err, rows) {

        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

        if(rows.length === 0) {
            res.send({error: true, message: "Empty Set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows[0]});
        }
    })
})


app.post('/api/publishTextbook', function(req, res) {

    sql.query("Select 1 from Textbook Where ISBN = ?", [req.body.isbn], function(err, rows) {
        
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
        //console.log(req.body.publicationNumber)
        if(rows.length === 0)
        {
            sql.query("Insert into Textbook (Publisher_Username, Name, Writer, Date_Published, Last_Edited,\
                      Date_Added, Price, ISBN, Issue_Number)\
                      Values (?, ?, ?, ?, NOW(), NOW(), ?, ?, ?)", [
                          req.body.publisher_username,
                          req.body.title,
                          req.body.writer,
                          req.body.date,
                          req.body.price,
                          req.body.isbn,
                          req.body.publicationNumber
                      ], function(err) {
                        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

                        sql.query("Select LAST_INSERT_ID() as Id", function(err, tid) {
                            let keywords = req.body.keywords;
                            console.log(keywords);
                            insertKeywords(keywords, res, tid);
                            res.send({error: false, message: "OK"});
                        })
                    });
        }
        else
        {
            // sql.query("Update Textbook Set Publisher_Username= ?, Name= ?, Writer= ?, Date_Published= ?,\
            //         Last_Edited= NOW(), Price= ?, Issue_Number= ? Where ISBN= ?", [
            //         req.body.publisher_username,
            //         req.body.title,
            //         req.body.writer,
            //         req.body.date,
            //         req.body.price,
            //         req.body.publicationNumber,
            //         req.body.isbn
            //     ], function(err) {
            //       if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
            //       res.send({error: false, message: "OK"});
            //     });

            res.send({error: true, message: "Ο αριθμός ISBN που έχετε εισάγει έχει ήδη καταχωρηθεί"})
        }


    });
})

function insertKeywords(keywords, res, tid) {
    if(keywords.length === 0)
        return;
    
    let keyword = keywords[0];
    keywords.shift();
    
    console.log(keyword)
    sql.query("Select Id from Keyword Where Word= ?", [keyword], function (err, ids) {

        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

        if(ids.length === 0)
        {
            sql.query("Insert into Keyword (Word) Values (?)", [keyword], function(err) {

                if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
                
                sql.query("Select LAST_INSERT_ID() as Id", function(err, id) {
                    console.log(id);

                    if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
                    
                    sql.query("Insert into Textbook_has_Keyword (Textbook_Id, Keyword_Id) \
                                Values (?, ?)", [tid[0].Id, id[0].Id],
                                function(err){
                                if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
                                insertKeywords(keywords, res, tid);
                            } );
                })
            })
        }
        else
        {
            sql.query("Insert into Textbook_has_Keyword (Textbook_Id, Keyword_Id) \
                    Values (?, ?)", [tid[0].Id, ids[0].Id],
                    function(err){
                    if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
                    insertKeywords(keywords, res, tid);
                } );
        }
    });

}



app.listen(8080, () => console.log('Listening on port 8080!'));

