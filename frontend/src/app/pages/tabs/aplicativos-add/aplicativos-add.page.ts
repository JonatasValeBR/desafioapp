import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AplicativoService } from 'src/app/api/aplicativo.service';
import { AdicionarAplicativo } from 'src/app/api/aplicativo.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aplicativos-add',
  templateUrl: './aplicativos-add.page.html',
  styleUrls: ['./aplicativos-add.page.scss'],
})
export class AplicativosAddPage implements OnInit {

  authForm: FormGroup;
  aplicativo: AdicionarAplicativo;
  constructor(private formBuilder: FormBuilder, private servicePessoa: AplicativoService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.criandoForm();
   }

  submitForm(){
    console.log(this.authForm.value);
    console.log(this.authForm.value.nome);

    this.aplicativo ={
      nome: this.authForm.value.nome,
    };
    this.servicePessoa.postAplicativo(this.aplicativo).subscribe(response => {
      this.router.navigateByUrl('/tabs/menu/aplicativo');
    })
  }

  get nome(): FormControl {
    return <FormControl>this.authForm.get('nome');
  }

  private criandoForm(): void {
    this.authForm = this.formBuilder.group({
      nome: ['Teste', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]]
    })
  }

}