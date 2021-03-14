import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { API_CONFIG } from '../core/api.config';
import { FiltroPessoa, AdicionarPessoa, EditarPessoa, TipoPessoa, VisualizarPessoa } from './pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http : HttpClient) { }
  private urlBase : string =  API_CONFIG.baseUrl + "/api/pessoas";

  getPessoas(page?: number, linesPerPage?: number, orderBy?:string, direction?:string): Observable<FiltroPessoa> {
    let url = `${this.urlBase}/page`;
    if (page!=null) {
      url = url.concat(`?page=${page}`);
    }
    if (linesPerPage!=null){
      url = url.concat(`&linesPerPage=${linesPerPage}`);
    }
    if (orderBy!=null){
      url = url.concat(`&orderBy=${orderBy}`);
    }
    if (direction!=null){
      url = url.concat(`&direction=${direction}`);
    }

    return this.http.get<FiltroPessoa>(url).pipe(
      map(obj => obj)
    );
  }

  postPessoas(pessoa: AdicionarPessoa): Observable<AdicionarPessoa> {
    const url = `${this.urlBase}`;

    return this.http.post<AdicionarPessoa>(url,pessoa).pipe(
      map(obj => obj)
    );
  }

  getPessoasByID(id: number): Observable<EditarPessoa> {
    const url = `${this.urlBase}/${id}`;

    return this.http.get<EditarPessoa>(url).pipe(
      map(obj => obj)
    );
  }

  getPessoaByID(id: number): Observable<VisualizarPessoa> {
    const url = `${this.urlBase}/${id}`;

    return this.http.get<VisualizarPessoa>(url).pipe(
      map(obj => obj)
    );
  }

  putPessoas(pessoa: EditarPessoa): Observable<EditarPessoa> {
    const url = `${this.urlBase}/${pessoa.id}`;

    return this.http.put<EditarPessoa>(url,pessoa).pipe(
      map(obj => obj)
    );
  }

  getTipoPessoa(): Observable<TipoPessoa[]> {
    const url = `${this.urlBase}/tipo`;

    return this.http.get<TipoPessoa[]>(url).pipe(
      map(obj => obj)
    );
  }

  getTipoPessoaById(id: number): Observable<TipoPessoa> {
    const url = `${this.urlBase}/tipo/${id}`;

    return this.http.get<TipoPessoa>(url).pipe(
      map(obj => obj)
    );
  }

  getPessoaByPerfil(id: number): Observable<VisualizarPessoa[]> {
    const url = `${this.urlBase}/perfis?perfis=${id}`;

    return this.http.get<VisualizarPessoa[]>(url).pipe(
      map(obj => obj)
    );
  }

  deletePessoas(id: number): Observable<any> {
    const url = `${this.urlBase}/${id}`;

    return this.http.delete<any>(url).pipe(
      map(obj => obj)
    );
  }


}
