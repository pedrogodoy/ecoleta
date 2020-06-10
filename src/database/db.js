//Importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

//Criar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// Utilizar o objeto de banco de dados para nossas operacoes
db.serialize(() => {
    //Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //Inserir dados na tabela
    // const query = `
    //     INSERT INTO places (
    //         image, 
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `
    // const values = [
    //     'https://images.unsplash.com/photo-1558583055-d7ac00b1adca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80" alt="Collectoria"',
    //     "Colectoria",
    //     "guilherme genbala",
    //     "numero 380",
    //     "Santa Catarina",
    //     "Rio do sul",
    //     "residuos e lampadas"
    // ]

    // function afterInsertData(err) {
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // }

    // // db.run(query, values, afterInsertData) //Chamando funcao como referencia

    // //Consultar dados na tabela
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log(rows)
    // })


    // Deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("registro deletado com sucesso")
    // })
})