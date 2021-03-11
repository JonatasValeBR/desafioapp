import { PerfilWithApp } from './perfil.model';

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
    VisualizarPessoa
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

export interface VisualizarPessoa {
  id: number,
  nome: string,
  idade: number,
  cpf: string,
  tipo: string,
  perfil: PerfilWithApp
}

export interface AdicionarPessoa {
  nome: string,
  idade: number,
  cpf: string,
  tipo: number,
  perfil: {
    id: number
  }
}

export interface EditarPessoa {
  id: number,
  nome: string,
  idade: number,
  cpf: string,
  tipo: number,
  perfil: {
    id: number
  }
}

export interface TipoPessoa {
  cod: number,
  descricao: string
}
