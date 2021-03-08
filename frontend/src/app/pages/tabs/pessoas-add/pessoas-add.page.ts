import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Perfil } from 'src/app/api/perfil.model';
import { PerfilService } from 'src/app/api/perfil.service';
import { AdicionarPessoa } from 'src/app/api/pessoa.model';
import { PessoaService } from 'src/app/api/pessoa.service';

@Component({
  selector: 'app-pessoas-add',
  templateUrl: './pessoas-add.page.html',
  styleUrls: ['./pessoas-add.page.scss'],
})
export class PessoasAddPage implements OnInit {

  authForm: FormGroup;
  perfis: Perfil[];
  pessoa: AdicionarPessoa;

  constructor(private formBuilder: FormBuilder, private servicePerfil: PerfilService, private servicePessoa: PessoaService) {}

  ngOnInit() {
   this.criandoForm();
  }

  ionViewWillEnter(): void{
    this.carregarCampos();
  }

  carregarCampos() {
    this.servicePerfil.getPerfis().subscribe(response => {
      this.perfis = response;
    });
  }

  submitForm(){
    console.log(this.authForm.value);
    console.log(this.authForm.value.nome);

    this.pessoa ={
      nome: this.authForm.value.nome,
      idade: this.authForm.value.idade,
      cpf: this.authForm.value.cpf,
      tipo: 1,
      perfil: {
        id: Number(this.authForm.value.perfil)
      }
    };
    this.servicePessoa.postPessoas(this.pessoa).subscribe(response => {
      console.log(response);
    })
  }

  get nome(): FormControl {
    return <FormControl>this.authForm.get('nome');
  }
  get idade(): FormControl {
    return <FormControl>this.authForm.get('idade');
  }
  get cpf(): FormControl {
    return <FormControl>this.authForm.get('cpf');
  }
  get perfil(): FormControl {
    return <FormControl>this.authForm.get('perfil');
  }
  get tipo(): FormControl {
    return <FormControl>this.authForm.get('tipo');
  }

  private criandoForm(): void {
    this.authForm = this.formBuilder.group({
      nome: ['Teste', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      idade: ['12',[Validators.required, Validators.max(150)]],
      cpf: ['79327348001',[Validators.required]],
      perfil: ['1',[Validators.required]],
      tipo: ['1',[Validators.required]]
    })
  }
}

