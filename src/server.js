const express = require("express")
const server = express()

//Banco de dados
const db = require("./database/db")

//configurar pasta public para ser visivel na raiz do servidor
server.use(express.static("public"))


//Utilizando template engines
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Rotas
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Ecoleta" })
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {

    //Buscar dados do db
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        console.log(rows)
        const total = rows.length


        return res.render("search-results.html", { places: rows, total: total })
    })

})

//Ligando servidor
server.listen(3000)