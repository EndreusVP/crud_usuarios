const express = require('express')
const mysql2 = require('mysql2')
const dotenv = require('dotenv')
dotenv.config();

//variavel que guarda a conexão com o MySQL
//mysql.createConnection função do mysql2 que cria a conexão
const connection = mysql2.createConnection({
    //dados do banco vindo do .env
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(function(err){
    if(err) {
        console.log("erro ao se conectar: " + err.message)
    } else{
        console.log("conexão com banco de dados bem sucedida")
    }
})

const app = express()

app.get("/users", function(req, res){
    connection.query("SELECT * FROM users" + function(err, results){
        if(err){
            res.send("erro ao buscar usuario: " + err.message)
        } else {
            res.json(results)
        }
    })
})

app.listen(3000, function(){
    console.log("servidor rodando na porta 3000")
})

