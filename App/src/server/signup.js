const sql = require('./connection').initConnection();

module.exports = function handleSignupPost(req, res) {
    let base = req.body.base;
    let spec = req.body.spec;

    const userinsert = `Insert into User (Username, Password, Email, Last_Login, Type) \
                        Values ( "${base.username}", "${base.password}", "${base.email}", NOW(), "${base.type}" )`
    console.log('userinsert', userinsert);

    function sendResponse(res) {
        res.send({error: false, message: "OK"})
    }

    sql.query(userinsert, function(err, rows, fields) {
        if (err) {
            res.send({error: true, message: "Something went wrong with User Application. Please try again.", trace: err})
            return;
        }

        console.log("Inserted User.");

        switch(base.type) {
            case "Stud":
                insertStudent(base, spec, sendResponse, res);
                break;
            case "Publ":
                insertAddress(base, spec, insertPublisher, sendResponse, res)
                break;
            case "Secr":
                insertSecretary(base, spec, sendResponse, res);
                break;
            case "Dist":
                insertAddress(base, spec, insertDistribution_Point, sendResponse, res)
                break;
        }
    })
    
    
}

function insertStudent(base, spec, responsecb, response) {
    let specinsert = `Insert into Student (Name, Surname, Phone, Student_Id, Personal_Id, University_Department_Id, Username)\
        Values ( "${spec.name}", "${spec.surname}", "${spec.phone}", "${spec.studentid}", "${spec.personalid}", ${spec.udp}, "${base.username}")`;

    sql.query(specinsert, function(err, rows, fields) {
        if (err) {
            res.send({error: true, message: "Something went wrong with Student Application. Please try again.", trace: err})
            return;
        }

        console.log("Inserted Student.");

        responsecb(response);
    })
}

function insertPublisher(base, spec, responsecb, response) {
    let specinsert = `Insert into Publisher (Name, Phone, Username, Address_Id)\
        Values ( "${spec.name}", "${spec.phone}", "${base.username}",
            (SELECT \`AUTO_INCREMENT\` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'mydb' AND TABLE_NAME = 'Address') - 1 )`

    sql.query(specinsert, function(err, rows, fields) {
        if (err) {
            res.send({error: true, message: "Something went wrong with Publisher Application. Please try again.", trace: err})
            return;
        }

        console.log("Inserted Publisher.");

        responsecb(response);
    })
}

function insertSecretary(base, spec, responsecb, response) {
    let specinsert = `Insert into Secretary (University_Department_Id, Username)\
        Values ( ${spec.udp}, "${base.username}" )`;

    sql.query(specinsert, function(err, rows, fields) {
        if (err) {
            res.send({error: true, message: "Something went wrong with Secretary Application. Please try again.", trace: err})
            return;
        }

        console.log("Inserted Secretary.");

        responsecb(response);
    })
}

function insertDistribution_Point(base, spec, responsecb, response) {
    let specinsert = `Insert into Distribution_Point (Name, Phone, Owner, Address_Id)\
        Values ( "${spec.name}", "${spec.phone}", "${base.username}", 
            (SELECT \`AUTO_INCREMENT\` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'mydb' AND TABLE_NAME = 'Address') - 1 )`;

    sql.query(specinsert, function(err, rows, fields) {
        if (err) {
            res.send({error: true, message: "Something went wrong with Distribution_Point Application. Please try again.", trace: err})
            return;
        }

        console.log("Inserted Distribution_Point.");

        responsecb(response);
    })
}

function insertAddress(base, spec, insertcb, rescb, res) {
    let adinsert = `Insert into Address (Street_Name, Street_Number, ZipCode, City)\
                    Values ("${spec.street}", "${spec.number}", ${spec.zipcode}, "${spec.city}")`;
    
    sql.query(adinsert, function (err, rows, fields) {
        if (err) throw err;

        console.log("Inserted Address.");

        insertcb(base, spec, rescb, res);
    });
}