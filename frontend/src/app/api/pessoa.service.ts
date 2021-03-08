import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { API_CONFIG } from '../core/api.config';
import { FiltroPessoa, AdicionarPessoa } from './pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http : HttpClient) { }
  private urlBase : string =  API_CONFIG.baseUrl + "/api/pessoas";

  getPessoas(page?: number, linesPerPage?: number, orderBy?:string, direction?:string): Observable<FiltroPessoa> {
    const url = `${this.urlBase}/page`;

    if (page!=null) {
      url.concat(`?page=${page}`);
    }
    if (linesPerPage!=null){
      url.concat(`&linesPerPage=${linesPerPage}`);
    }
    if (orderBy!=null){
      url.concat(`?orderBy=${orderBy}`);
    }
    if (direction!=null){
      url.concat(`?direction=${direction}`);
    }

    return this.http.get<FiltroPessoa>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  postPessoas(pessoa: AdicionarPessoa): Observable<AdicionarPessoa> {
    const url = `${this.urlBase}`;

    return this.http.post<AdicionarPessoa>(url,pessoa).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  deletePessoas(id: number): Observable<any> {
    const url = `${this.urlBase}/${id}`;

    return this.http.delete<any>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  private errorHandler(e: any): Observable<any>{

    console.log("Error ao acessar o servidor");
    return EMPTY;
  }

}
