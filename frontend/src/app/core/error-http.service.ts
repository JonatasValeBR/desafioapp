import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHttpService {

  constructor() { }

  transform(error: any){
    if (error.error.errors == undefined && error.error == undefined){
      return [{fieldName: "Servidor", message: "Fora do Ar"}]
    } if (error.error.errors == undefined) {
      return [{fieldName: "Error", message: error.error.msg}]
    }
    return error.error.errors;
  }


}
