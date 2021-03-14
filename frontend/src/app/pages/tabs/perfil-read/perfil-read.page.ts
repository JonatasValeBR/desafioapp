import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/api/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil, PerfilWithApp } from 'src/app/api/perfil.model';
import { AplicativoService } from 'src/app/api/aplicativo.service';
import { Aplicativo } from 'src/app/api/aplicativo.model';
import { VisualizarPessoa } from 'src/app/api/pessoa.model';
import { PessoaService } from 'src/app/api/pessoa.service';
import { ErrorHttpService } from 'src/app/core/error-http.service';
import { ToastService } from 'src/app/core/toast.service';

@Component({
  selector: 'app-perfil-read',
  templateUrl: './perfil-read.page.html',
  styleUrls: ['./perfil-read.page.scss'],
})
export class PerfilReadPage implements OnInit {

  pessoas: VisualizarPessoa[];
  perfil: PerfilWithApp;
  buttonText: string = "Voltar";
  buttonIcon: string ="chevron-back-outline";
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private convert: ErrorHttpService, private toast: ToastService, private servicePerfil: PerfilService, private route: ActivatedRoute, private router: Router, private servicePessoa: PessoaService) { }

  ngOnInit() {
    this.instancePerfil();
    this.instancePessoas();
  }

  ionViewWillEnter(): void{
    this.route.params.subscribe( parametros => {

       if (parametros['id'] != undefined) {
        this.servicePerfil.getPerfilByID(parametros['id'])
        .subscribe(response => {
          this.instancePerfil(response);
        }, error => {
          error = this.convert.transform(error);
          for(let x of error)
          {
            let msg: string = `${x.fieldName} - ${x.message}`;
            this.toast.show(msg, "toast-error", 3500);
          }
        });
        this.servicePessoa.getPessoaByPerfil(parametros['id'])
        .subscribe(response => {
          this.instancePessoas(response);
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

  private instancePerfil(data?: PerfilWithApp): void {
    this.perfil = {
      id: data == undefined ? null : data.id,
      nome: data == undefined ? null : data.nome,
      aplicativos: data == undefined ? null : data.aplicativos
    };
  }

  private instancePessoas(data?: VisualizarPessoa[]): void {
    this.pessoas = [];
    if (data != undefined){
      for(let pessoa of data){
        this.pessoas.push({
          id: pessoa.id,
          nome: pessoa.nome
        })
      }
    }
  }
}
