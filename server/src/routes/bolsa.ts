import express from 'express'
import { conectaAPI } from '../conectaAPI'
import { bolsaController } from '../controllers/bolsaController'

export const bolsa = express()


/* Retorna a lista de fundos imobiliarios listados na bolsa */

bolsa.get("/fiis", bolsaController.getFIIs)

/* Retorna as ações listadas na bolsa */

bolsa.get("/acoes", bolsaController.getAcoes)

/* Retorna ativo especifico de acordo com seu codigo  */
bolsa.get("/:ticket", bolsaController.getTicket)

