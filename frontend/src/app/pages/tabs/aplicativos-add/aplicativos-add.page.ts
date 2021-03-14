import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AplicativoService } from 'src/app/api/aplicativo.service';
import { AdicionarAplicativo } from 'src/app/api/aplicativo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/toast.service';
import { ErrorHttpService } from 'src/app/core/error-http.service';

@Component({
  selector: 'app-aplicativos-add',
  templateUrl: './aplicativos-add.page.html',
  styleUrls: ['./aplicativos-add.page.scss'],
})
export class AplicativosAddPage implements OnInit {

  authForm: FormGroup;
  aplicativo: AdicionarAplicativo;
  buttonText: string = "Voltar";
  buttonIcon: string ="chevron-back-outline";
  constructor(private convert: ErrorHttpService, private toast: ToastService, private formBuilder: FormBuilder, private serviceAplicativo: AplicativoService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.criandoForm();
   }

  submitForm(){

    this.aplicativo ={
      nome: this.authForm.value.nome,
    };
    this.serviceAplicativo.postAplicativo(this.aplicativo).subscribe(response => {
      this.toast.show("Aplicativo cadastrado com Sucesso", "toast-success");
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

}
