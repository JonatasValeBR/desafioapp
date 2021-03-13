import { Injectable } from '@angular/core';
import { API_CONFIG } from '../core/api.config';
import { HttpClient } from '@angular/common/http';
import { Perfil, PerfilWithApp } from './perfil.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http : HttpClient) { }

  private urlBase : string =  API_CONFIG.baseUrl + "/api/perfis";

  getPerfis(): Observable<Perfil[]> {
    const url = `${this.urlBase}`;

    return this.http.get<Perfil[]>(url).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  getPerfilByID(id: number): Observable<PerfilWithApp> {
    const url = `${this.urlBase}/${id}`;

    return this.http.get<PerfilWithApp>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  private errorHandler(e: any): Observable<any>{
    console.log("Error ao acessar o servidor");
    return EMPTY;
  }
}
