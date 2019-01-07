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

function getUserUniversityData(req, res) {
    sql.query(`Select u.Id as uid, d.Id as udpid From Student as s, University as u, University_Department as d
                Where u.Id = d.University_Id and s.Username = ? and s.University_Department_Id = d.Id`, [req.body.user], function(err, rows) {

        if (err) throw err;

        res.send({error: false, message: "OK", data: rows[0]})
    })
}

function getDepartmentData(req, res) {
    sql.query("Select * From University_Department Where Id = ?", [req.body.udid],function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows[0]});
        }
    })
}

function getCourses(req, res) {
    const dep = req.body.udp;

    const query = `Select * From Course Where University_Department_id = ${dep} Order By Semester ASC`;

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

    const query = `Select distinct(Semester) From Course Where University_Department_id = ${dep} Order By Semester ASC`;

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
                    Where University_Department_id = ${dep} and Semester = ${sem}
                    Order By Semester ASC`;

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
    getDepartmentData: getDepartmentData,
    getUniversities: getUniversities,
    getCoursesBySemester: getCoursesBySemester,
    getSemesters: getSemesters,
    getUserUniversityData: getUserUniversityData,
    getCourses: getCourses
}