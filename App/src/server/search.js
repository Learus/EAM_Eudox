const sql = require('./connection').initConnection();

function getTextbooks(req, res) {
    const query = `Select t.*, p.*, a.*, dp.*
    From Publisher as p, Textbook as t,
    Address as a, Distribution_Point as dp, Distribution_Point_has_Textbook as dpht
    Where p.Username = t.Publisher_Username and
    dp.Address_Id = a.Id and
    dp.Id = dpht.Distribution_Point_Id and
    t.Id = dpht.Textbook_Id`

    const options = {
        sql: query,
        nestTables: true
    }

    sql.query(options, function (err, rows) {
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows});
        }
    })
}

function getTextbookNames(req, res) {
    sql.query("Select distinct(Name) From Textbook", function(err, rows) {
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows.map(row => {return {Id: row.Name, Name: row.Name} } )});
        }
    })
}

function getTextbookWriters(req, res) {
    sql.query("Select distinct(Writer) From Textbook", function(err, rows) {
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows.map(row => {return {Id: row.Writer, Name: row.Writer} } )});
        }
    })
}

function getTextbookISBNs(req, res) {
    sql.query("Select distinct(ISBN) From Textbook", function(err, rows) {
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows.map(row => {return {Id: row.ISBN, Name: row.ISBN} } )});
        }
    })
}

function getPublishers(req, res) {
    sql.query("Select * From Publisher", function(err, rows) {
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows.map(row => {return {Id: row.Username, Name: row.Name} } )});
        }
    })
}

function getDistrbutionPoints(req, res) {
    sql.query("Select * From Distribution_Point", function(err, rows) {
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows.map(row => {return {Id: row.Id, Name: row.Name} } )});
        }
    })
}

function getKeywords(req, res) {
    sql.query("Select * From Keyword", function(err, rows) {
        if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };

        if (rows.length === 0) {
            res.send({error: true, message: "Empty set"});
        }
        else {
            res.send({error: false, message: "OK", data: rows.map(row => {return {Id: row.Id, Name: row.Word} } )});
        }
    })
}

function searchTextbooks(req, res) {
    let filters = req.body;

    let query = `Select t.*, dp.*, p.*, a.* `

    let tables = [
        'Textbook as t',
        'Distribution_Point as dp',
        'Distribution_Point_has_Textbook as dpht',
        'Publisher as p',
        'Address as a'
    ]

    let wheres = [
        't.Id = dpht.Textbook_Id',
        'dp.Id = dpht.Distribution_Point_Id',
        't.Publisher_Username = p.Username',
        'dp.Address_id = a.Id'
    ]

    if (filters.name) wheres.push(`t.Name Like '%${filters.name}%'`)

    if (filters.writer) wheres.push(`t.Writer Like '%${filters.writer}%'`)

    if (filters.isbn) wheres.push(`t.ISBN = ${filters.isbn}`)

    if (filters.distributor) wheres.push(`(dp.Id = ${filters.distributor} XOR dp.Name Like '%${filters.distributor}%')`)

    if (filters.publisher) wheres.push(`p.Username = '${filters.publisher}'`)

    if (filters.uni || filters.udp || filters.course) {
        tables.push('University as u', 'University_Department as udp', 'Course as c', 'Course_has_Textbook as cht');
        wheres.push(
            'u.Id = udp.University_id',
            'udp.Id = c.University_Department_Id',
            'c.Id = cht.Course_Id',
            'cht.Textbook_Id = t.Id'
        )

        if (filters.uni) wheres.push(`u.Id = ${filters.uni}`)

        if (filters.udp) wheres.push(`udp.Id = ${filters.udp}`)

        if (filters.course) wheres.push(`(c.Id = ${filters.course} XOR c.Name Like %'${filters.course}%')`)
    }

    if (filters.keywords) {
        tables.push(
            'Keyword as k',
            'Textbook_has_Keyword as thk'
        )
        wheres.push(
            'k.Id = thk.Keyword_Id',
            'thk.Textbook_Id = t.Id'
        )
    }

    query += 'From '
    for (let i = 0; i < tables.length; i++) {
        query += `${tables[i]} `;

        if (i !== tables.length - 1) 
            query += ', '
    }

    query += 'Where '
    for (let i = 0; i < wheres.length; i++) {
        query += `${wheres[i]} `;

        if (i !== wheres.length - 1) 
            query += 'and '
    }

    if (filters.keywords) {
        let ids = [];
        let likes = [];

        let conds = [];

        query += 'and k.Word = any ( Select Word from Keyword Where '

        for (let i = 0; i < filters.keywords.length; i++) {
            const word = filters.keywords[i]

            if (isNaN(parseInt(word))) {
                query += `Keyword.Word Like '%${word}%'`
            }
            else {
                query += `Keyword.Id = ${word}`
            }

            if (i !== filters.keywords.length - 1) 
                query += ' or '
        }

        

        query += ') group by t.Id'
    }

    
    console.log(query);
    const options = {
        sql: query,
        nestTables: true
    }
    sql.query("Set sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'", function (err) {
        sql.query(options, function (err, rows) {
            if (err) { console.error(err); res.send({error: true, message: "Something went wrong in database retrieval. Please try again."}); return; };
    
            if (rows.length === 0)
                res.send({error: true, message: "Empty Set"})
            else {
                res.send({error: false, message: "OK", data: rows})
                console.log("Successfully Searched");
            }
        })
    })
    
    
}

module.exports = {
    getTextbooks: getTextbooks,
    getKeywords: getKeywords,
    getPublishers: getPublishers,
    getDistrbutionPoints: getDistrbutionPoints,
    getTextbookISBNs: getTextbookISBNs,
    getTextbookWriters: getTextbookWriters,
    getTextbookNames: getTextbookNames,
    searchTextbooks: searchTextbooks
}