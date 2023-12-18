const CryptoJS = require('crypto-js');
const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'app-db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')

app.get('/', (req, res) =>{
    const randomSha2 = CryptoJS.SHA256('Full Cycle' + (Math.random() * 10000)).toString(CryptoJS.enc.Hex);
    const newNameGenerated = `Bruno Mann Ramos ${randomSha2.substring(0, 10)}`;

    const connection = mysql.createConnection(config)
    const sqlInsert = `INSERT INTO people(name) VALUES ('${newNameGenerated}')`;
    connection.query(sqlInsert)

    connection.query("SELECT name FROM people;", function (error, result) {
        if (error) {
            return console.error(error.message);
        }
        let namesDb = result.map((people) => `${people.name}` ).join('</br> - ');

        res.send(`<h1>Full Cycle Rocks!</h1>
        - Lista de nomes cadastrada no banco de dados: </br> - ${namesDb}`);
    });
    connection.end();
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})