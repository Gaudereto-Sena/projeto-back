import express from 'express'
import { investimentos_controller } from '../controllers/investimentos.controller'

export const investimentos = express.Router()

investimentos.get('/', investimentos_controller.getInvestimentos)

investimentos.get('/consolidados', investimentos_controller.getDadosConsolidados)

