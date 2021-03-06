import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-pessoas-add',
  templateUrl: './pessoas-add.page.html',
  styleUrls: ['./pessoas-add.page.scss'],
})
export class PessoasAddPage implements OnInit {


  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      nome: new FormControl('teste', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      idade: ['1',[]],
      cpf: ['',[]],
      tipo: ['',[]],
      perfil: ['',[]]
    })
  }

  ngOnInit() {
  }

  adicionaPessoa(){

  }
}
