import fs from 'fs'

/* enum TIPO_ATIVO_ENUM {
    ACOES = 'Ações',
    FUNDO_IMOBILIARIO = 'Fundo Imobiliário'
   }

TIPO_ATIVO_ENUM.ACOES */

const padronizaTipoDaOperacao = (tipo: string) => {
    if (tipo === 'Ações') {
        tipo = 'Acoes'
    }
    let tipoSemEspacos: string = tipo.replace(/\s/g, '')
    tipoSemEspacos = tipoSemEspacos.toLowerCase()
    return tipoSemEspacos
}

const escreveJSON = (json: any, url: string) => {
    const jsonString = JSON.stringify(json, undefined, 2)
    /* Escreve no json a operacao adicionada */
    fs.writeFile(url, jsonString, 'utf-8', (err) => {
        if (err) {
            console.log(`Ocorreu um erro ao escrever em ${url}`);
            return console.log(err);
        }

        console.log(`Json ${url} foi salvo.`);
    })
}

export {
    padronizaTipoDaOperacao,
    escreveJSON
}