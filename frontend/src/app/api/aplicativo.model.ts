export interface Aplicativo {
  id: number,
  nome: string,
}
export interface AdicionarAplicativo {
  nome: string,
}

export interface FiltroAplicativo {
  totalPages: number,
  totalElements: number,
  pageable: {
    page: number,
    size: number,
    sort: [
      string
    ]
  },
  first: true,
  last: true,
  size: number,
  content: [
    Aplicativo
  ],
  number: number,
  sort: {
    sorted: boolean,
    unsorted: boolean,
    empty: boolean
  },
  numberOfElements: number,
  empty: boolean
}
