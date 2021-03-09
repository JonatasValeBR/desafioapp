import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Aplicativo, AdicionarAplicativo, FiltroAplicativo } from './aplicativo.model';
import { map, catchError } from 'rxjs/operators';
import { API_CONFIG } from '../core/api.config';

@Injectable({
  providedIn: 'root'
})
export class AplicativoService {

  constructor(private http : HttpClient) { }

  private urlBase : string =  API_CONFIG.baseUrl + "/api/aplicativos";

  getAplicativos(page?: number, linesPerPage?: number, orderBy?:string, direction?:string): Observable<FiltroAplicativo> {
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

    return this.http.get<FiltroAplicativo>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  postAplicativo(pessoa: AdicionarAplicativo): Observable<AdicionarAplicativo> {
    const url = `${this.urlBase}`;

    return this.http.post<AdicionarAplicativo>(url,pessoa).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  deleteAplicativo(id: number): Observable<any> {
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
