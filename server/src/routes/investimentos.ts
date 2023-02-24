import express from 'express'
import { investimentosController } from '../controllers/investimentosController'

export const investimentos = express()

investimentos.get('/', investimentosController.getInvestimentos)

