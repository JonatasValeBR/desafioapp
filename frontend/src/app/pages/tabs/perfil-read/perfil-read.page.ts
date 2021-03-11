import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/api/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from 'src/app/api/perfil.model';
import { AplicativoService } from 'src/app/api/aplicativo.service';
import { Aplicativo } from 'src/app/api/aplicativo.model';

@Component({
  selector: 'app-perfil-read',
  templateUrl: './perfil-read.page.html',
  styleUrls: ['./perfil-read.page.scss'],
})
export class PerfilReadPage implements OnInit {

  perfil: Perfil;
  aplicativos: Aplicativo[];
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private servicePerfil: PerfilService, private route: ActivatedRoute, private router: Router, private serviceAplicativo: AplicativoService) { }

  ngOnInit() {
    this.instancePerfil();
    this.instanceAplicativos();
  }

  ionViewWillEnter(): void{
    this.route.params.subscribe( parametros => {
      console.log("paramid: " + parametros['id']);

       if (parametros['id'] != undefined) {
        this.servicePerfil.getPerfilByID(parametros['id'])
        .subscribe(response => {
          this.instancePerfil(response);
        });
       }else{
         this.router.navigateByUrl('/tabs/menu/pessoa');
       }
     });
  }
  private instancePerfil(data?: Perfil): void {
    this.perfil = {
      id: data == undefined ? null : data.id,
      nome: data == undefined ? null : data.nome,
    }
  }
  private instanceAplicativos(data?: Aplicativo[]): void {
    this.aplicativos = data == undefined ? null : data;
  }
}
