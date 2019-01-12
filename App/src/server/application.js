const sql = require('./connection').initConnection();

function getStudentApplications(req, res) {

    sql.query(  " Select ta.*\
                    From Textbook_Application as ta, Student_has_Textbook_Application as shta \
                    Where ta.Id = shta.Textbook_Application_Id and\
                    shta.Student_Username = ? Order By Date Desc",
        [req.body.username],
        function(err, applications, fields) {

        if (err) { console.error("line 12\n", err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

        if (applications.length === 0) {
            res.send({error: true, message: "Empty set"})
        }
        else {
            res.send({error: false, message: "OK", data: applications});
        }
    })
}

function getCurrentTextbookApplication(req, res) {
    const query = ` Select t.*, p.*, taht.Taken, c.Id, c.Name, c.Semester, a.*, dp.*, dpht.Copies, ta.Id
                    From Textbook_Application as ta, Textbook_Application_has_Textbook as taht, 
                    Publisher as p, Textbook as t, Course as c, Course_has_Textbook as cht, Student_has_Textbook_Application as shta,
                    Address as a, Distribution_Point as dp, Distribution_Point_has_Textbook as dpht
                    Where ta.Is_Current = TRUE and
                    taht.Textbook_Application_Id = ta.Id and
                    t.Id = taht.Textbook_Id and
                    t.Id = cht.Textbook_id and
                    c.Id = cht.Course_Id and
                    p.Username = t.Publisher_Username and
                    shta.Student_Username = '${req.body.user}' and
                    shta.Textbook_Application_Id = ta.Id and
                    dp.Address_Id = a.Id and
                    dp.Id = dpht.Distribution_Point_Id and
                    t.Id = dpht.Textbook_Id`;

    // console.log(query);
    const options = {
        sql: query,
        nestTables: true
    }

    sql.query(options, function(err, rows, fields) {
        if (err) { console.error("line 47\n", err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"})
        }
        else {
            res.send({error: false, message: "OK", data: rows});
        }
    });   
}

function getTextbookApplication(req, res) {
    const query = ` Select t.*, p.*, taht.Taken, c.Id, c.Name, c.Semester, a.*, dp.*, dpht.Copies
                    From Textbook_Application as ta, Textbook_Application_has_Textbook as taht, 
                    Publisher as p, Textbook as t, Course as c, Course_has_Textbook as cht, Student_has_Textbook_Application as shta,
                    Address as a, Distribution_Point as dp, Distribution_Point_has_Textbook as dpht
                    Where ta.Id = ${req.body.id} and
                    taht.Textbook_Application_Id = ta.Id and
                    t.Id = taht.Textbook_Id and
                    t.Id = cht.Textbook_id and
                    c.Id = cht.Course_Id and
                    p.Username = t.Publisher_Username and
                    shta.Student_Username = '${req.body.user}' and
                    shta.Textbook_Application_Id = ta.Id and
                    dp.Address_Id = a.Id and
                    dp.Id = dpht.Distribution_Point_Id and
                    t.Id = dpht.Textbook_Id`

    // console.log(query);
    const options = {
        sql: query,
        nestTables: true
    }

    sql.query(options, function(err, rows, fields) {
        if (err) { console.error("line 82\n", err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"})
        }
        else {
            res.send({error: false, message: "OK", data: rows});
        }
    });
}

function createTextbookApplication(req, res) {
    const appl = req.body.new;
    let deletequery = null;

    if (req.body.old) {
        console.log("98 old exists")
        deletequery = `Delete From Textbook_Application_has_Textbook Where Textbook_Application_Id = ${req.body.old} and Taken = FALSE`
        sql.query(deletequery, function(err, rows) {
            if (err) { console.error("line 100\n", err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

            insertApplication(req.body.new, req.body.old, res);
        })
    }
    else {
        sql.query("Select ta.Id From Textbook_Application as ta, Student_has_Textbook_Application as shta\
                    Where ta.Id = shta.Textbook_Application_Id and\
                    ta.Is_Current = TRUE and\
                    shta.Student_Username = ?", 
        [req.body.user], function (err, rows) {

            if (err) { console.error("line 112\n", err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
            
            if (rows.length === 0) {
                const insertApplicationQuery = ` Insert into Textbook_Application (Date, Is_Current, PIN, Status)
                    Values (NOW(), TRUE, ${randomPIN()}, 'Pending')`;
                sql.query(insertApplicationQuery, function (err, rows) {
                    if (err) { console.error("line 118\n", err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

                    const insertSHTAQuery = `Insert into Student_has_Textbook_Application (Student_Username, Textbook_Application_Id)
                    Values ('${req.body.user}', 
                        (SELECT \`AUTO_INCREMENT\` as a FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'mydb' AND TABLE_NAME = 'Textbook_Application') - 1)`
                    sql.query(insertSHTAQuery, function (err, rows) {
                        if (err) { console.error("line 124\n", err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

                        insertApplication(req.body.new, null, res)
                    })
                })
            }
            else {
                console.log("132 old exists")
                deletequery = `Delete From Textbook_Application_has_Textbook Where Textbook_Application_Id = ${rows[0].Id} and Taken = FALSE`
                sql.query(deletequery, function(err) {
                    if (err) { console.error("line 133\n", err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
                    console.log(rows);
                    insertApplication(req.body.new, rows[0].Id, res);
                })
            }
        })
    }
}

function randomPIN() {
    let result = '';
    for (let i = 16; i > 0; --i) {
        result += "0123456789"[Math.floor(Math.random() * 10)];
    }
    return result;
}

function insertApplication(textbooks, id, res) {

    if (id) {
        let query = 'Insert into Textbook_Application_has_Textbook (Textbook_Application_Id, Textbook_Id, Taken) Values '
        console.log("154", id)
        for (let i = 0; i < textbooks.length; i++) {

            if (textbooks[i].taht)
                if (textbooks[i].taht.Taken) continue;
            
            query += `(${id}, ${textbooks[i].t.Id}, FALSE)`
            if (i !== textbooks.length - 1) {
                query += ", ";
            }
        }
        if (query.length !== 99)
            sql.query(query, function (err, rows) {
                if (err) { console.error("line 167\n", err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

                res.send({error: false, message:"OK"})
            });
        else {
            res.send({error: false, message:"OK"})
        }
    }
    else {
        console.log("New Application")
        const idquery = `(SELECT \`AUTO_INCREMENT\` as a FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'mydb' AND TABLE_NAME = 'Textbook_Application' )`;

        sql.query(idquery, function (err, rows) {
            if (err) { console.error("line 180\n", err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
    
            let query = 'Insert into Textbook_Application_has_Textbook (Textbook_Application_Id, Textbook_Id,  Taken) Values '
            console.log("301", rows[0])
            for (let i = 0; i < textbooks.length; i++) {
                query += `(${rows[0].a} - 1, ${textbooks[i].t.Id}, FALSE)`
                if (i !== textbooks.length - 1) {
                    query += ", ";
                }
            }
    
            sql.query(query, function (err, rows) {
                if (err) { console.error("line 192\n", err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
    
                res.send({error: false, message:"OK"})
            })
        })
    }
}

module.exports = {
    getStudentApplications: getStudentApplications,
    getTextbookApplication: getTextbookApplication,
    getCurrentTextbookApplication: getCurrentTextbookApplication,
    createTextbookApplication: createTextbookApplication,
}