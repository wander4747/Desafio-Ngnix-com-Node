const express = require('express')
const faker = require('faker-br');
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'devfullcycle'
};
const mysql = require('mysql')
connection = mysql.createConnection(config)



app.get('/', (req,res) => {
    const name = faker.name.firstName()
    const sql = `INSERT INTO users (name) VALUES('${name}')`
    connection.query(sql)

    let html = "<h1>Full Cycle Rocks!</h1>"
    
    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        html += "<ol>"
        results.map(result => {
            html += `<li>${result.name}</li>`
        })
        html += "</ol>"

        res.send(html)
    })
})

app.listen(port, ()=> {
    console.log('Running port ' + port)
})