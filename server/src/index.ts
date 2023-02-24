import express from 'express'
import { operacao } from './routes/operacoes'
import { bolsa } from './routes/bolsa'
import cors from 'cors'
import { investimentos } from './routes/investimentos'


const app = express()
app.use(cors())

app.use(express.json())
app.use('/operacoes', operacao)
app.use('/bolsa', bolsa)
app.use('/investimentos', investimentos)

const port = 8080
const host = 'localhost'


app.listen(port, host, () => {
    console.log(`Servidor express iniciado em http://${host}:${port}`)
})