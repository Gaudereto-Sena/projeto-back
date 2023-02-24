import express from 'express'
import { operacaoController } from '../controllers/operacoesController'

export const operacao = express()

operacao.get('/', operacaoController.getOperacoes)

operacao.post('/', operacaoController.postOperacoes)

operacao.patch('/', operacaoController.patchOperacoes)

operacao.delete('/', operacaoController.deletarOperacoes)



