type Ativos = {
    stock: string;
    name: string;
    close: number;
    change: number;
    volume: number;
    market_cap: number;
    logo: string;
    sector: string;
}

async function retornaTodasAcoes() {
    const todasAcoes = await fetch('https://brapi.dev/api/quote/list')
    const todasAcoesConvertidas = await todasAcoes.json()
    /*  const acoesOrdenadas = todasAcoesConvertidas.stocks.sort() */
    return todasAcoesConvertidas.stocks
}

async function retornaAtivoProcurado(codigo: string) {
    const ativoProcurado = await fetch(`https://brapi.dev/api/quote/${codigo}`)
    const ativoProcuradoConvertido = await ativoProcurado.json()
    return ativoProcuradoConvertido.results
}

function filterFundosImobiliarios(data: Ativos[]) {
    const listaFII = data.filter((item) => {
        const hasFII = item.name.includes('FII')
        return hasFII
    })
    return listaFII
}

function getAcoesSemFracionados(data: Ativos[]) {
    const listaSemFracionados = data.filter((item) => {
        return item.stock[item.stock.length - 1] !== 'F'
    }).filter((ativos) => {
        const hasFII = ativos.name.includes('FII')
        return !hasFII
    })
    return listaSemFracionados
}



export const conectaAPI = {
    retornaTodasAcoes,
    retornaAtivoProcurado,
    getAcoesSemFracionados,
    filterFundosImobiliarios
}
