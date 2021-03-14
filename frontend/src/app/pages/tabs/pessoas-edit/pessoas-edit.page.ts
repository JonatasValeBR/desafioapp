import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { PerfilService } from 'src/app/api/perfil.service';
import { PessoaService } from 'src/app/api/pessoa.service';
import { Perfil } from 'src/app/api/perfil.model';
import { EditarPessoa, VisualizarPessoa, TipoPessoa } from 'src/app/api/pessoa.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHttpService } from 'src/app/core/error-http.service';
import { ToastService } from 'src/app/core/toast.service';

@Component({
  selector: 'app-pessoas-edit',
  templateUrl: './pessoas-edit.page.html',
  styleUrls: ['./pessoas-edit.page.scss'],
})
export class PessoasEditPage implements OnInit {

  constructor(private convert: ErrorHttpService, private toast: ToastService, private formBuilder: FormBuilder, private servicePerfil: PerfilService, private servicePessoa: PessoaService, private route: ActivatedRoute, private router: Router) {}
  authForm: FormGroup;
  perfis: Perfil[];
  tipos: TipoPessoa[];
  pessoa: EditarPessoa;
  buttonText: string = "Voltar";
  buttonIcon: string ="chevron-back-outline";

  ngOnInit() {
    this.criandoForm();
    this.instancePessoa();
  }

  ionViewWillEnter(): void{
    this.route.params.subscribe( parametros => {


       if (parametros['id'] != undefined) {
        this.servicePessoa.getPessoasByID(parametros['id'])
        .subscribe(response => {
          this.atualizarForm(response);
          this.instancePessoa(response)
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
    this.carregarCampos();
  }

  carregarCampos() {
    this.servicePerfil.getPerfis().subscribe(response => {
      this.perfis = response;
    }, error => {
      error = this.convert.transform(error);
      for(let x of error)
      {
        let msg: string = `${x.fieldName} - ${x.message}`;
        this.toast.show(msg, "toast-error", 3500);
      }
    });
    this.servicePessoa.getTipoPessoa().subscribe(response => {
      this.tipos = response;
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
    this.pessoa ={
      id: this.pessoa.id,
      nome: this.authForm.value.nome,
      idade: this.authForm.value.idade,
      cpf: this.authForm.value.cpf,
      tipo: this.authForm.value.tipo,
      perfil: {
        id: Number(this.authForm.value.perfil)
      }
    };
    this.servicePessoa.putPessoas(this.pessoa).subscribe(response => {
      this.toast.show("Pessoa Editada com Sucesso", "toast-success");
      this.router.navigateByUrl('/tabs/menu/pessoa');
    }, error => {
      error = this.convert.transform(error);
      for(let x of error)
      {
        let msg: string = `${x.fieldName} - ${x.message}`;
        this.toast.show(msg, "toast-error", 3500);
      }
    });
  }

  get id(): FormControl {
    return <FormControl>this.authForm.get('id');
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
      id: ['', []],
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      idade: ['',[Validators.required, Validators.max(150)]],
      cpf: ['',[Validators.required]],
      perfil: ['',[Validators.required]],
      tipo: ['',[Validators.required]]
    });
  }

  private instancePessoa(data?: EditarPessoa): void {

    this.pessoa ={
      id: data == undefined ? null : data.id,
      nome: data == undefined ? null : data.nome,
      idade: data == undefined ? null : data.idade,
      cpf: data == undefined ? null : data.cpf,
      tipo: data == undefined ? null : data.tipo,
      perfil: {
        id: data == undefined ? null : data.perfil.id
      }
    }
  }

  private atualizarForm(pessoa: EditarPessoa): void {
    this.authForm = this.formBuilder.group({
      id: [pessoa.id, []],
      nome: [pessoa.nome, [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      idade: [pessoa.idade,[Validators.required, Validators.max(150)]],
      cpf: [pessoa.cpf,[Validators.required]],
      perfil: [pessoa.perfil,[Validators.required]],
      tipo: [pessoa.tipo,[Validators.required]]
    });
  }
}
