const sql = require('./connection').initConnection();

function getUniversities(req, res) {
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
}

function getDepartments(req, res) {
    const uni = req.body.university;

    const query = "Select * From University_Department Where University_Id = " + uni;

    sql.query(query, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"})
        }
        else {
            res.send({error: false, message: "OK", data: rows});
        }
    })
}

function getCourses(req, res) {
    const dep = req.body.udp;

    const query = "Select * From Course Where University_Department_id = " + dep;

    sql.query(query, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows});
        }
    })
}

function getSemesters(req, res) {
    const dep = req.body.udp;

    const query = "Select distinct(Semester) From Course Where University_Department_id = " + dep; + "Order By Semester ASC";

    sql.query(query, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows.map(row => { return {Id: row.Semester, Name: row.Semester} } )});
        }
    })
}

function getCoursesBySemester(req, res) {
    const dep = req.body.udp;
    const sem = req.body.semester;

    const query = ` Select *
                    From Course
                    Where University_Department_id = ${dep} and Semester = ${sem}`;

    sql.query(query, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data:rows});
        }
    })
}

module.exports = {
    getDepartments: getDepartments,
    getUniversities: getUniversities,
    getCoursesBySemester: getCoursesBySemester,
    getSemesters: getSemesters,
    getCourses: getCourses
}