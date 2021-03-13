import { Component, OnInit, ViewChild } from '@angular/core';
import { Aplicativo, FiltroAplicativo } from 'src/app/api/aplicativo.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { AplicativoService } from 'src/app/api/aplicativo.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-aplicativo',
  templateUrl: './aplicativo.page.html',
  styleUrls: ['./aplicativo.page.scss'],
})
export class AplicativoPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private service: AplicativoService, private alert: AlertService) { }

  filtroAplicativo: FiltroAplicativo;
  aplicativosBackup: Aplicativo[];
  aplicativos: Aplicativo[];
  aplicativosAll: Aplicativo[];
  scroll = false;
  orderBy: string = "ASC";
  sortBy: string = "nome";

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.iniciar();
  }

  deletarAplicativo(id: number){
    this.alert.presentAlertConfirm('Atenção!','Voce esta preste a excluir um aplicativo, voce deseja realizar essa operacao ?')
    .then((res:any)=>{
      if(res.role  === 'okay'){
        this.service.deleteAplicativo(id).subscribe(response => {
          window.location.reload()
        })
      }
    });
  }

  toggleInfiniteScroll(): void {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    this.scroll = this.infiniteScroll.disabled;
  }

  loadData(event): void {
    setTimeout(() => {
      event.target.complete();
      if (this.filtroAplicativo.last != true){
        this.addMoreItems(this.filtroAplicativo.number+1,6,this.sortBy,this.orderBy);
      }
    }, 500);
  }

  async filterList(evt) {
    this.aplicativos = this.aplicativosAll;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.aplicativos = this.aplicativos.filter(aplicativo => {
      if (aplicativo.nome && searchTerm) {
        return (aplicativo.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  setFiltroAplicativo(filtro: FiltroAplicativo): void{
    this.filtroAplicativo = filtro;
  }

  setAplicativos(aplicativos: Aplicativo[], all?: boolean): void{
    if (all == undefined){
      aplicativos.forEach(element => {
        this.aplicativos.push(element);
      });
      this.aplicativosBackup = aplicativos;
    }else {
      this.aplicativosAll = aplicativos;
    }

  }

  addMoreItems(page?: number, linesPerPage?: number, orderBy?:string, direction?:string, all?: boolean, iniciar?:boolean): void{
    this.service.getAplicativos(page, linesPerPage, orderBy, direction).subscribe(response => {
      if (all == undefined){
        this.setFiltroAplicativo(response);
      }
      if (iniciar != undefined){
        this.addMoreItems(0,this.filtroAplicativo.totalElements,this.sortBy,this.orderBy, true);
      }

      this.setAplicativos(response['content'], all);
    });
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
    this.aplicativos = [];
    this.addMoreItems(0,this.aplicativosBackup.length,this.sortBy,this.orderBy);
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

  iniciar(): void {
    this.aplicativos = [];
    this.aplicativosBackup = [];
    this.filtroAplicativo = null;
    this.addMoreItems(0,6,this.sortBy,this.orderBy, undefined, true);
  }

  getContent(): HTMLIonContentElement {
    return document.querySelector('ion-content');
  }

  scrollToTop(): void {
   this.getContent().scrollToTop(500);
  }
}
