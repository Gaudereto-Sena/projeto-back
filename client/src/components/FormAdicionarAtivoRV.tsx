import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'
import Textfield from './Textfield'

function FormAdicionarAtivoRV() {
    const { quantidadeOperada, setQuantidadeOperada, valorDeOperacao, setValorDeOperacao, dataDaOperacao, setDataDaOperacao } = useAdicionarOperacaoContext()
    return (
        <>
            <Textfield
                estiloInline={{}}
                id='data_compra'
                type='date'
                required
                funcaoOnChange={(e) => setDataDaOperacao(e)}
                value={dataDaOperacao}
                label='Data da compra'
                placeholder=''
                min={0}
                step={0}
            />
            <div className='flex gap-8'>
                <Textfield
                    estiloInline={{
                        width: '50%'
                    }}
                    id='quantidade_operada'
                    type='number'
                    required
                    funcaoOnChange={(e) => setQuantidadeOperada(e)}
                    value={quantidadeOperada}
                    placeholder='Insira a quantidade operada'
                    label='Quantidade'
                    min={0}
                    step={1}
                />
                <Textfield
                    estiloInline={{
                        width: '50%'
                    }}
                    id='valor_de_operada'
                    type='number'
                    required
                    funcaoOnChange={(e) => setValorDeOperacao(e)}
                    value={valorDeOperacao}
                    placeholder='Insira o valor da operacao'
                    label='Valor da operacao'
                    min={0.00}
                    step={0.1}
                />
            </div>
        </>
    )
}

export default FormAdicionarAtivoRV