import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/api/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil, PerfilWithApp } from 'src/app/api/perfil.model';
import { AplicativoService } from 'src/app/api/aplicativo.service';
import { Aplicativo } from 'src/app/api/aplicativo.model';

@Component({
  selector: 'app-perfil-read',
  templateUrl: './perfil-read.page.html',
  styleUrls: ['./perfil-read.page.scss'],
})
export class PerfilReadPage implements OnInit {

  perfil: PerfilWithApp;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private servicePerfil: PerfilService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.instancePerfil();
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
  }

  private instancePerfil(data?: PerfilWithApp): void {
    this.perfil = {
      id: data == undefined ? null : data.id,
      nome: data == undefined ? null : data.nome,
      aplicativos: data == undefined ? null : data.aplicativos
    };
  }
}
