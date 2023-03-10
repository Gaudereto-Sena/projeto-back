import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { dadosChave, Operacao } from '../types'
import { escreveJSON } from '../util/util'



const getInvestimentos = (req: any, res: any) => {
    const jsonInvestimentos = JSON.parse(fs.readFileSync('./src/json/investimentos.json').toString())
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        status: 'sucess',
        data: jsonInvestimentos,   
    })
}

const getDadosConsolidados = (req: any, res: any) => {
    const dadosConsolidados = JSON.parse(fs.readFileSync('./src/json/consolidado.json').toString())
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        status: 'sucess',
        data: dadosConsolidados
    })
}

export const investimentos_controller: any = {
    getInvestimentos,
    getDadosConsolidados
} 