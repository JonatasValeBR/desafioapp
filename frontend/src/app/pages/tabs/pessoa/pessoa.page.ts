import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll} from '@ionic/angular';
import { PessoaService} from 'src/app/api/pessoa.service';
import { VisualizarPessoa, FiltroPessoa } from 'src/app/api/pessoa.model';
import { AlertService } from 'src/app/services/alert.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.page.html',
  styleUrls: ['./pessoa.page.scss'],
})
export class PessoaPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private service: PessoaService, private alert: AlertService) { }

  filtroPessoa: FiltroPessoa;
  pessoas: VisualizarPessoa[];
  pessoasBackup: VisualizarPessoa[];
  scroll: boolean = false;
  orderBy: string = "ASC";
  sortBy: string = "nome";

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.iniciar();
  }

  async filterList(evt) {
    this.pessoas = this.pessoasBackup;
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
          console.log(response);
        })
      }
    });
  }
  iniciar(): void {
    this.pessoas = [];
    this.pessoasBackup = [];
    this.filtroPessoa = null;
    this.addMoreItems(0,6,this.sortBy,this.orderBy);
  }
  toggleInfiniteScroll(): void {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    this.scroll = this.infiniteScroll.disabled;
  }

  loadData(event): void {
    setTimeout(() => {
      event.target.complete();
      if (this.filtroPessoa.last != true){
        this.addMoreItems(this.filtroPessoa.number+1,6,this.sortBy,this.orderBy);
      }
    }, 500);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.iniciar();
      event.target.disabled = false;
    }, 2000);
  }

  setFiltroPessoa(filtro: FiltroPessoa): void{
    this.filtroPessoa = filtro;
  }

  setPessoas(pessoas: VisualizarPessoa[]): void{
    pessoas.forEach(element => {
      this.pessoas.push(element);
    });
    this.pessoasBackup = pessoas;
  }

  addMoreItems(page?: number, linesPerPage?: number, orderBy?:string, direction?:string): void{
    this.service.getPessoas(page, linesPerPage, orderBy, direction).subscribe(response => {
      this.setFiltroPessoa(response);
      this.setPessoas(response['content']);
    });
  }

  getContent(): HTMLIonContentElement {
    return document.querySelector('ion-content');
  }

  scrollToTop(): void {
   this.getContent().scrollToTop(500);
  }



}
