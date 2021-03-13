import { Aplicativo } from './aplicativo.model';

export interface Perfil {
  id: number,
  nome: string,
}

export interface PerfilWithApp {
  id: number,
  nome: string,
  aplicativos: Aplicativo[]
}
