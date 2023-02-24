import api from '../api/api'
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import { InterfaceDataList } from '../types'

const DataList = ({ options } : InterfaceDataList ) => {
    const { setAtivoProcurado, codigo, setCodigo } = useBuscaAtivoContext()

    const mudarValor = async (valor: string) => {
        setCodigo(valor)
    }

    const buscarAtivo = async (valor: string) => {
        if (valor.length >= 5) {
            const resposta = await api.get(`/bolsa/${valor}`)
            const respostaData = await resposta.data.data
            setAtivoProcurado(respostaData)
        }
    }

    return (
        <>
            <input
                className='shadow-lg w-full rounded-lg text-base p-3 box-border my-3'
                list='ativos'
                value={codigo}
                placeholder='Digite o codigo do ativo'
                onChange={(e) => {
                    mudarValor(e.target.value)
                    buscarAtivo(e.target.value)
                }}
            />
            <datalist id='ativos'>
                {options.map((codigoAtivo) => <option value={codigoAtivo} key={codigoAtivo}>{codigoAtivo}</option>)}
            </datalist>
        </>
    )
}

export default DataList