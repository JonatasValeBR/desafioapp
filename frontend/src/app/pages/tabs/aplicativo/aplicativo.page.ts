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
  aplicativos: Aplicativo[];
  scroll = false;

  ngOnInit(): void {
    this.aplicativos = [];
    this.filtroAplicativo = null;
    this.addMoreItems()
  }
  ionChange(){
    console.log("alterou o bagulho");
  }

  deletarAplicativo(id: number){
    this.alert.presentAlertConfirm('Atenção!','Voce esta preste a excluir um aplicativo, voce deseja realizar essa operacao ?')
    .then((res:any)=>{
      if(res.role  === 'okay'){
        this.service.deleteAplicativo(id).subscribe(response => {
          console.log(response);
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
      console.log('Done');
      event.target.complete();
      if (this.filtroAplicativo.last != true){
        this.addMoreItems(this.filtroAplicativo.number+1);
      } else {
        event.target.disabled = true;
      }

    }, 500);
  }

  setFiltroAplicativo(filtro: FiltroAplicativo): void{
    this.filtroAplicativo = filtro;
  }

  setAplicativos(aplicativos: Aplicativo[]): void{
    aplicativos.forEach(element => {
      this.aplicativos.push(element);
    });
  }

  addMoreItems(page?: number, linesPerPage?: number, orderBy?:string, direction?:string): void{
    this.service.getAplicativos(page, linesPerPage, orderBy, direction).subscribe(response => {
      this.setFiltroAplicativo(response);
      this.setAplicativos(response['content']);
    });
  }
}
