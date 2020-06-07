const express = require("express")
const server = express()

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
    return res.render("search-results.html")
})

//Ligando servidor
server.listen(3000)