import express from 'express'
import { operacao_controller } from '../controllers/operacoes.controller'

export const operacao = express.Router()

operacao.get('/', operacao_controller.getOperacoes)

operacao.post('/', operacao_controller.postOperacoes)

operacao.put('/', operacao_controller.putOperacoes)

operacao.delete('/', operacao_controller.deletarOperacoes)



