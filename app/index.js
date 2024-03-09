const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'appdb'
};

const mysql = require('mysql2');
const conexao = mysql.createConnection(config);
const sql = `INSERT INTO pessoa (nome) values ('Nome da pessoa')`;
conexao.query(sql);
let resultado = '<h1>Pessoas cadastradas</h1>';

conexao.query("SELECT * FROM pessoa", function (err, result, fields) {
    if (err) throw err;

    Object.keys(result).forEach(function(key) {
      var row = result[key];
      resultado += '<br><h3>' + row.nome + '</h3>';
    });
  });


conexao.end();

app.get('/', (req, res) => {
    res.send(resultado);
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});