import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import RouterUsuario from './routes/UsuarioRoutes.js'

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use("/api", RouterUsuario)

app.listen(port, ()=>{
    console.log(`Conectado al servido mediante puerto No. ${port}`)
})
