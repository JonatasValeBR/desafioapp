import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarPessoa } from 'src/app/api/pessoa.model';
import { PessoaService } from 'src/app/api/pessoa.service';
import { ToastService } from 'src/app/core/toast.service';
import { ErrorHttpService } from 'src/app/core/error-http.service';

@Component({
  selector: 'app-pessoas-read',
  templateUrl: './pessoas-read.page.html',
  styleUrls: ['./pessoas-read.page.scss'],
})
export class PessoasReadPage implements OnInit {
  pessoa: VisualizarPessoa;
  buttonText: string = "Voltar";
  buttonIcon: string ="chevron-back-outline";
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private convert: ErrorHttpService, private toast: ToastService,private servicePessoa: PessoaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.instancePessoa();
  }

  ionViewWillEnter(): void{
    this.route.params.subscribe( parametros => {
       if (parametros['id'] != undefined) {
        this.servicePessoa.getPessoaByID(parametros['id'])
        .subscribe(response => {
          this.servicePessoa.getTipoPessoaById(Number(response.tipo))
          .subscribe(response => {
            this.instanceTipo(response);
          }, error => {
            error = this.convert.transform(error);
            for(let x of error)
            {
              let msg: string = `${x.fieldName} - ${x.message}`;
              this.toast.show(msg, "toast-error", 3500);
            }
          });
          this.instancePessoa(response);
        }, error => {
          error = this.convert.transform(error);
          for(let x of error)
          {
            let msg: string = `${x.fieldName} - ${x.message}`;
            this.toast.show(msg, "toast-error", 3500);
          }
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
