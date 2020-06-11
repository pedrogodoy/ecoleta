const express = require("express")
const server = express()

//Banco de dados
const db = require("./database/db")

//configurar pasta public para ser visivel na raiz do servidor
server.use(express.static("public"))

//Habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))


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

server.post("/savepoint", (req, res) => {

    // inserir dados
    const query = `
        INSERT INTO places (
            image, 
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })

    }

    db.run(query, values, afterInsertData) //Chamando funcao como referencia
})

server.get("/search", (req, res) => {

    const search = req.query.search


    //Buscar dados do db
    db.all(`SELECT * FROM places WHERE city like '%${search}%'`, function (err, rows) {
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