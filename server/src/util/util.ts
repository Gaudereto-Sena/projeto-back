import fs from 'fs'

const padronizaTipoDaOperacao = (tipo: string) => {
    if (tipo === 'Ações') {
        tipo = 'Acoes'
    }
    let tipoSemEspacos: string = tipo.replace(/\s/g, '')
    tipoSemEspacos = tipoSemEspacos.toLowerCase()
    return tipoSemEspacos
}

const escreveJSON = (json: any, url: string) => {
    const jsonString = JSON.stringify(json)
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