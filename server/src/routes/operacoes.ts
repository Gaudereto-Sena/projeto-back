import express from 'express'
import { operacao_controller } from '../controllers/operacoes.controller'

export const operacoes = express.Router()

operacoes.get('/', operacao_controller.getOperacoes)

operacoes.get('/:id', operacao_controller.getOperacoesPorId)

operacoes.post('/', operacao_controller.postOperacoes)

operacoes.put('/', operacao_controller.putOperacoes)

operacoes.delete('/:id', operacao_controller.deletarOperacoes)



