export interface FiltroPessoa {
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
    {
      id: number,
      nome: string,
      idade: number,
      cpf: string,
      tipo: string,
      perfil: {
        id: number,
        nome: string,
        aplicativos: [
          {
            id: number,
            nome: string
          }
        ]
      }
    }
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

export interface Pessoa {
  id: number,
  nome: string,
  idade: number,
  cpf: string,
  tipo: string,
  perfil: {
    id: number,
    nome: string,
    aplicativos: [
      {
        id: number,
        nome: string
      }
    ]
  }
}
