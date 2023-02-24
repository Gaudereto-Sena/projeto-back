export type InterfaceCodigoETipo = {
    codigo: string,
    tipo: string
}

export type InterfaceDataList = {
    options: string[]
}

export type InterfaceTextField = {
    id: any,
    label: string,
    type: string,
    required: boolean,
    funcaoOnChange: (obj: any) => void,
    value: any,
    placeholder: string,
    estiloInline: object,
    step?: number,
    min?: number
}

export type InterfaceSelect = {
    options: string[],
    onChange: (obj: any) => void,
    value: any,
    id: string
}

export type InterfaceBuscaAtivoContext = {
    codigo: string,
    setCodigo: (string: string) => void,
    ativoProcurado: InterfaceAtivoBuscado,
    setAtivoProcurado: (obj: any) => void,
    tiposInvestimento: string[],
    ativos: InterfaceAtivoReduzido[],
    setAtivos: (obj: any) => void
}

export type interfaceDadosInvestimentos = {
    operacoes: {},
    setOperacoes: (obj: any) => void,
    tipoDeInvestimentoSelecionado: string,
    setTipoDeInvestimentoSelecionado: (obj: string) => void,
    quantidadeOperada: number,
    setQuantidadeOperada: (obj: any) => void,
    valorDeOperacao: number,
    setValorDeOperacao: (obj: any) => void,
    dataDaOperacao: string,
    setDataDaOperacao: (obj: any) => void,
    showModal: boolean,
    setShowModal: (obj: any) => void,
    investimentos: InterfaceInvestimentos,
    setInvestimentos: (obj: any) => void,
}
export type InterfaceInvestimentos = {
    [key: string]: InvestimentoConsolidado,
}

export type InterfaceInvestimentoConsolidadoAtivo = {
    id: string,
    nome: string,
    codigo: string,
    tipo: string,
    quantidadeTotal: number,
    valorPagoTotal: number,
    precoMedio: number,
    operacoes: Operacao[]
}

export type InvestimentoConsolidado = {
    [key: string]: InterfaceInvestimentoConsolidadoAtivo
}
export type Operacao = {
    id: string,
    codigo: string,
    tipo: string,
    quantidade: number,
    precoDaOperacao: number,
    valorTotalDaOperacao: number,
    dataDaOperacao: string,
    venda: boolean
}

export type InterfaceAtivoBuscado = {
    symbol: string,
    shortName: string,
    longName: string,
    currency: string,
    regularMarketPrice: number,
    regularMarketDayHigh: number,
    regularMarketDayLow: number,
    regularMarketDayRange: string,
    regularMarketChange: number,
    regularMarketChangePercent: number,
    regularMarketTime: string,
    marketCap: number,
    regularMarketVolume: number,
    regularMarketPreviousClose: number,
    regularMarketOpen: number,
    averageDailyVolume10Day: number,
    averageDailyVolume3Month: number,
    fiftyTwoWeekLowChange: number,
    fiftyTwoWeekLowChangePercent: number,
    fiftyTwoWeekRange: string,
    fiftyTwoWeekHighChange: number,
    fiftyTwoWeekHighChangePercent: number,
    fiftyTwoWeekLow: number,
    fiftyTwoWeekHigh: number,
    twoHundredDayAverage: number,
    twoHundredDayAverageChange: number,
    twoHundredDayAverageChangePercent: number
}

export type InterfaceAtivoReduzido = {
    stock: string,
    name: string,
    close: number,
    change: number,
    volume: number,
    marketCap: number | null,
    logo: string,
    sector: string | null
}