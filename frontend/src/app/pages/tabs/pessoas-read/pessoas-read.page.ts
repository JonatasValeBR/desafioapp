import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarPessoa } from 'src/app/api/pessoa.model';
import { PessoaService } from 'src/app/api/pessoa.service';
import { cpuUsage } from 'process';

@Component({
  selector: 'app-pessoas-read',
  templateUrl: './pessoas-read.page.html',
  styleUrls: ['./pessoas-read.page.scss'],
})
export class PessoasReadPage implements OnInit {
  pessoa: VisualizarPessoa;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private servicePessoa: PessoaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.instancePessoa();
  }

  ionViewWillEnter(): void{
    this.route.params.subscribe( parametros => {
      console.log("paramid: " + parametros['id']);

       if (parametros['id'] != undefined) {
        this.servicePessoa.getPessoaByID(parametros['id'])
        .subscribe(response => {
          this.servicePessoa.getTipoPessoaById(Number(response.tipo))
          .subscribe(response => {
            this.instanceTipo(response);
          });
          this.instancePessoa(response);
        });
       }else{
         this.router.navigateByUrl('/tabs/menu/pessoa');
       }
     });
  }

  private instanceTipo(value): void{
    this.pessoa.tipo = value.descricao;
  }
  private instancePessoa(data?: VisualizarPessoa): void {

    this.pessoa = {
      id: data == undefined ? null : data.id,
      nome: data == undefined ? null : data.nome,
      idade: data == undefined ? null : data.idade,
      cpf: data == undefined ? null : data.cpf,
      tipo: data == undefined ? null : data.tipo,
      perfil: {
        id: data == undefined ? null : data.perfil.id,
        nome: data == undefined ? null : data.perfil.nome,
        aplicativos: data == undefined ? null : data.perfil.aplicativos
      }
    }
  }

}
