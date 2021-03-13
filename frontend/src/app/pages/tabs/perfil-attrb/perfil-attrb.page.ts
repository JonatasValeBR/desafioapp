import { Component, OnInit } from '@angular/core';
import { PerfilWithApp } from 'src/app/api/perfil.model';
import { PerfilService } from 'src/app/api/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Aplicativo, FiltroAplicativo } from 'src/app/api/aplicativo.model';
import { AplicativoService } from 'src/app/api/aplicativo.service';
import { cpuUsage } from 'process';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-attrb',
  templateUrl: './perfil-attrb.page.html',
  styleUrls: ['./perfil-attrb.page.scss'],
})
export class PerfilAttrbPage implements OnInit {

  adicionar: boolean = false;
  error: boolean = false;
  ids: number[] = [];
  perfil: PerfilWithApp;
  aplicativos: Aplicativo[];
  aplicativosBkp: Aplicativo[];
  aplicativosAdicionar: Aplicativo[];
  constructor(private servicePerfil: PerfilService, private route: ActivatedRoute, private router: Router, private serviceAplicativos: AplicativoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.instancePerfil();
    this.instanceAplicativos();
  }

  ionViewWillEnter(): void{
    this.route.params.subscribe( parametros => {
       if (parametros['id'] != undefined) {
        this.servicePerfil.getPerfilByID(parametros['id'])
        .subscribe(response => {
          this.instancePerfil(response);
        });
       }else{
         this.router.navigateByUrl('/tabs/menu/perfil');
       }
     });

     this.serviceAplicativos.getAplicativos()
     .subscribe(response => {
      this.instanceAplicativos(response.content);
     });
  }

  retirarAplicativo(id: number): void {
    if (this.aplicativos.length <= 1){
      this.error = true;
    } else {
      this.aplicativos = this.aplicativos.filter(
        a => {
          if (a.id != id) {
            return a;
          }
        }
      );
      this.carregarListaAdd();
    }
  }

  adicionarAplicativo(id: number): void {
    this.aplicativos.push(this.buscarId(id));
    this.carregarListaAdd();
  }


  private instanceAplicativos(data?: Aplicativo[]) {
    this.aplicativosBkp = data == undefined ? [] : data;
    if (data != undefined) {
      this.carregarListaAdd();
    }
  }

  private carregarListaAdd() {
    this.carregarIds(this.aplicativos);
    this.aplicativosAdicionar = this.aplicativosBkp;
    this.aplicativosAdicionar = this.aplicativosAdicionar.filter(
      a => {
      if (!this.ids.includes(a.id)) {
        return a;
      }
    });
  }

  private instancePerfil(data?: PerfilWithApp): void {
    this.perfil = {
      id: data == undefined ? null : data.id,
      nome: data == undefined ? null : data.nome,
      aplicativos: data == undefined ? null : data.aplicativos
    };
    this.aplicativos = data == undefined ? null : data.aplicativos;
  }

  private carregarIds(array: Aplicativo[]) {
    this.ids = [];
    for(let aplicativo of array){
      this.ids.push(aplicativo.id);
    }
  }

  private buscarId(number): Aplicativo {
    for(let aplicativo of this.aplicativosBkp){
      if (aplicativo.id == number){
        return aplicativo;
      }
    }
    return null;
  }

  onSave() {
    if (this.aplicativos.length == 0){
      this.error = true;
    } else {
      this.perfil.aplicativos = this.aplicativos;
      this.servicePerfil.putPerfil(this.perfil).subscribe(response => {
        this.router.navigateByUrl('/tabs/menu/perfil');
      });
    }
  }
}
