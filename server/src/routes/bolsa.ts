import express from 'express'

import { bolsa_controller } from '../controllers/bolsa.controller'

export const bolsa = express.Router()


/* Retorna a lista de fundos imobiliarios listados na bolsa */

bolsa.get("/fiis", bolsa_controller.getFIIs)

/* Retorna as ações listadas na bolsa */

bolsa.get("/acoes", bolsa_controller.getAcoes)

/* Retorna ativo especifico de acordo com seu codigo  */
bolsa.get("/:ticket", bolsa_controller.getTicket)

