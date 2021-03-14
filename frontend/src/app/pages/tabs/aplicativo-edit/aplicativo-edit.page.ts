import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AplicativoService } from 'src/app/api/aplicativo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdicionarAplicativo, Aplicativo } from 'src/app/api/aplicativo.model';
import { ErrorHttpService } from 'src/app/core/error-http.service';
import { ToastService } from 'src/app/core/toast.service';

@Component({
  selector: 'app-aplicativo-edit',
  templateUrl: './aplicativo-edit.page.html',
  styleUrls: ['./aplicativo-edit.page.scss'],
})
export class AplicativoEditPage implements OnInit {
  authForm: FormGroup;
  aplicativo: Aplicativo;
  buttonText: string = "Voltar";
  buttonIcon: string ="chevron-back-outline";
  constructor(private convert: ErrorHttpService, private toast: ToastService,private formBuilder: FormBuilder, private serviceAplicativo: AplicativoService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.criandoForm();
    this.instanceAplicativo();
  }

  ionViewWillEnter(): void{
    this.route.params.subscribe( parametros => {

       if (parametros['id'] != undefined) {
        this.serviceAplicativo.getAplicativoByID(parametros['id'])
        .subscribe(response => {
          this.atualizarForm(response);
          this.instanceAplicativo(response)
        });
       }else{
         this.router.navigateByUrl('/tabs/menu/pessoa');
       }
     }, error => {
      error = this.convert.transform(error);
      for(let x of error)
      {
        let msg: string = `${x.fieldName} - ${x.message}`;
        this.toast.show(msg, "toast-error", 3500);
      }
    });
  }

  submitForm(){
    this.aplicativo ={
      id: this.aplicativo.id,
      nome: this.authForm.value.nome,
    };

    this.serviceAplicativo.putAplicativo(this.aplicativo).subscribe(response => {
      this.toast.show("Aplicativo editado com Sucesso", "toast-success");
      this.router.navigateByUrl('/tabs/menu/aplicativo');
    }, error => {
      error = this.convert.transform(error);
      for(let x of error)
      {
        let msg: string = `${x.fieldName} - ${x.message}`;
        this.toast.show(msg, "toast-error", 3500);
      }
    })
  }

  get nome(): FormControl {
    return <FormControl>this.authForm.get('nome');
  }

  private criandoForm(): void {
    this.authForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]]
    })
  }

  private instanceAplicativo(data?: Aplicativo): void {
    this.aplicativo ={
      id: data == undefined ? null : data.id,
      nome: data == undefined ? null : data.nome,
    }
  }

  private atualizarForm(aplicativo: Aplicativo): void {
    this.authForm = this.formBuilder.group({
      nome: [aplicativo.nome, [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
    });
  }
}
