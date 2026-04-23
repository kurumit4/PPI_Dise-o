import sql from 'mssql'
import dotenv from 'dotenv'

dotenv.config()

const stringConnection = {
    user : process.env.USER,
    password: process.env.PASSWORD,
    server : process.env.SERVER,
    database : process.env.DATABASE,
    options : {
        trustServerCertificate : true
    }
}

const poolConect = new sql.ConnectionPool(stringConnection)
.connect()
.then(conn =>{
    console.log("Conectados a la base de datos")
    return conn
})
.catch(error =>{
    console.log("Error al conectarse a la base de datos" + error)
    throw error
})

export {sql, poolConect}