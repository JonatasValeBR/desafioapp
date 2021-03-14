import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll} from '@ionic/angular';
import { PessoaService} from 'src/app/api/pessoa.service';
import { VisualizarPessoa, FiltroPessoa } from 'src/app/api/pessoa.model';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorHttpService } from 'src/app/core/error-http.service';
import { ToastService } from 'src/app/core/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.page.html',
  styleUrls: ['./pessoa.page.scss'],
})
export class PessoaPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor( private convert: ErrorHttpService, private toast: ToastService, private service: PessoaService, private alert: AlertService) { }

  filtroPessoa: FiltroPessoa;
  pessoas: VisualizarPessoa[];
  pessoasBackup: VisualizarPessoa[];
  pessoasAll:  VisualizarPessoa[];
  scroll: boolean = false;
  orderBy: string = "ASC";
  sortBy: string = "nome";
  numberPage: number = 6;
  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.iniciar();
  }

  async filterList(evt) {
    this.pessoas = this.pessoasAll;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.pessoas = this.pessoas.filter(pessoa => {
      if (pessoa.nome && searchTerm) {
        return (pessoa.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  async orderChanged(ev: any) {
    switch (ev.detail.value) {
      case "nome":
        this.sortBy = "nome";
      break;
      case "cpf":
        this.sortBy = "cpf";
      break;
      case "idade":
        this.sortBy = "idade";
      break;
      default:
        this.sortBy = "nome";
      break;
    }
    this.recarregarAposFiltro();
  }

  directionChanged(ev: any) {
    switch (ev.detail.value) {
      case "ASC":
        this.orderBy = "ASC";
      break;
      case "DESC":
        this.orderBy = "DESC";
      break;
      default:
        this.orderBy = "ASC";
      break;
    }
    this.recarregarAposFiltro();
  }

  recarregarAposFiltro(){
    this.pessoas = [];
    this.addMoreItems(0,this.pessoasBackup.length,this.sortBy,this.orderBy);
  }

  deletarPessoa(id: number){
    this.alert.presentAlertConfirm('Atenção!','Voce esta preste a excluir uma pessoa, voce deseja realizar essa operacao ?')
    .then((res:any)=>{
      if(res.role  === 'okay'){
        this.service.deletePessoas(id).subscribe(response => {
          this.toast.show("Pessoa Excluida com Sucesso", "toast-success");
          this.iniciar();
        }, error => {
          error = this.convert.transform(error);
          for(let x of error)
          {
            let msg: string = `${x.fieldName} - ${x.message}`;
            this.toast.show(msg, "toast-error", 3500);
          }
    })
      }
    });
  }

  iniciar(): void {
    this.pessoas = [];
    this.pessoasBackup = [];
    this.filtroPessoa = null;
    this.addMoreItems(0,this.numberPage,this.sortBy,this.orderBy, undefined, true);
  }

  toggleInfiniteScroll(): void {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    this.scroll = this.infiniteScroll.disabled;
  }

  loadData(event): void {
    setTimeout(() => {
      event.target.complete();
      if (this.filtroPessoa.last != true){
        this.addMoreItems(this.filtroPessoa.number+1,this.numberPage,this.sortBy,this.orderBy);
      }
    }, 500);
  }

  doRefresh(event) {


    setTimeout(() => {

      event.target.complete();
      this.iniciar();
      event.target.disabled = false;
    }, 2000);
  }

  setFiltroPessoa(filtro: FiltroPessoa): void{
    this.filtroPessoa = filtro;
  }

  setPessoas(pessoas: VisualizarPessoa[], all?:boolean): void{
    if (all == undefined){
      pessoas.forEach(element => {
        this.pessoas.push(element);
      });
      this.pessoasBackup = pessoas;
    } else {
      this.pessoasAll = pessoas;
    }
  }

  addMoreItems(page?: number, linesPerPage?: number, orderBy?:string, direction?:string, all?:boolean, iniciar?: boolean): void{
    this.service.getPessoas(page, linesPerPage, orderBy, direction).subscribe(response => {
      if (all == undefined){
        this.setFiltroPessoa(response);
      }

      if (iniciar != undefined){
        this.addMoreItems(0,this.filtroPessoa.totalElements,this.sortBy,this.orderBy, true);
      }
      this.setPessoas(response['content'], all);
    }, error => {
      error = this.convert.transform(error);
      for(let x of error)
      {
        let msg: string = `${x.fieldName} - ${x.message}`;
        this.toast.show(msg, "toast-error", 3500);
      }
    });
  }

  getContent(): HTMLIonContentElement {
    return document.querySelector('ion-content');
  }

  scrollToTop(): void {
   this.getContent().scrollToTop(500);
  }



}
