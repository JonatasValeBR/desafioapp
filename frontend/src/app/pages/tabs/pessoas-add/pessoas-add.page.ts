import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Perfil } from 'src/app/api/perfil.model';
import { PerfilService } from 'src/app/api/perfil.service';
import { AdicionarPessoa, TipoPessoa } from 'src/app/api/pessoa.model';
import { PessoaService } from 'src/app/api/pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoas-add',
  templateUrl: './pessoas-add.page.html',
  styleUrls: ['./pessoas-add.page.scss'],
})
export class PessoasAddPage implements OnInit {

  authForm: FormGroup;
  perfis: Perfil[];
  tipos: TipoPessoa[];
  pessoa: AdicionarPessoa;

  constructor(private formBuilder: FormBuilder, private servicePerfil: PerfilService, private servicePessoa: PessoaService, private route: ActivatedRoute, private router: Router) {}

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
    this.servicePessoa.getTipoPessoa().subscribe(response => {
      this.tipos = response;
    });
  }

  submitForm(){

    this.pessoa ={
      nome: this.authForm.value.nome,
      idade: this.authForm.value.idade,
      cpf: this.authForm.value.cpf,
      tipo: this.authForm.value.tipo,
      perfil: {
        id: Number(this.authForm.value.perfil)
      }
    };
    this.servicePessoa.postPessoas(this.pessoa).subscribe(response => {
      this.router.navigateByUrl('/tabs/menu/pessoa');
    });
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
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      idade: ['',[Validators.required, Validators.max(150)]],
      cpf: ['',[Validators.required]],
      perfil: ['',[Validators.required]],
      tipo: ['',[Validators.required]]
    })
  }
}

