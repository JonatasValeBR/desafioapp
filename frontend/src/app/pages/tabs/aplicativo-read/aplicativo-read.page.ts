import { Component, OnInit } from '@angular/core';
import { Aplicativo } from 'src/app/api/aplicativo.model';
import { PerfilWithApp, Perfil } from 'src/app/api/perfil.model';
import { PerfilService } from 'src/app/api/perfil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AplicativoService } from 'src/app/api/aplicativo.service';
import { ErrorHttpService } from 'src/app/core/error-http.service';
import { ToastService } from 'src/app/core/toast.service';

@Component({
  selector: 'app-aplicativo-read',
  templateUrl: './aplicativo-read.page.html',
  styleUrls: ['./aplicativo-read.page.scss'],
})
export class AplicativoReadPage implements OnInit {

  aplicativo: Aplicativo;
  perfis: Perfil[];
  buttonText: string = "Voltar";
  buttonIcon: string ="chevron-back-outline";
  constructor(private convert: ErrorHttpService, private toast: ToastService,private servicePerfil: PerfilService, private route: ActivatedRoute, private router: Router, private serviceAplicativo: AplicativoService) { }

  ngOnInit() {
    this.instancePerfis();
    this.instanceAplicativo();
  }

  ionViewWillEnter(): void{
    this.route.params.subscribe( parametros => {

       if (parametros['id'] != undefined) {
        this.serviceAplicativo.getAplicativoByID(parametros['id'])
        .subscribe(response => {
          this.instanceAplicativo(response);
        }, error => {
          error = this.convert.transform(error);
          for(let x of error)
          {
            let msg: string = `${x.fieldName} - ${x.message}`;
            this.toast.show(msg, "toast-error", 3500);
          }
        });
        this.servicePerfil.getPerfisByAplicativo(parametros['id'])
        .subscribe(response => {
          this.instancePerfis(response);
        }, error => {
          error = this.convert.transform(error);
          for(let x of error)
          {
            let msg: string = `${x.fieldName} - ${x.message}`;
            this.toast.show(msg, "toast-error", 3500);
          }
        });
       }else{
         this.router.navigateByUrl('/tabs/menu/perfil');
       }


     });
  }

  private instanceAplicativo(data?: Aplicativo): void {
    this.aplicativo = {
      id: data == undefined ? null : data.id,
      nome: data == undefined ? null : data.nome,
    };
  }

  private instancePerfis(data?: Perfil[]): void {
    this.perfis = [];
    if (data != undefined){
      for(let perfil of data){
        this.perfis.push({
          id: perfil.id,
          nome: perfil.nome
        })
      }
    }
  }

}
