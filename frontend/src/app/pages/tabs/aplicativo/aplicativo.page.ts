import { Component, OnInit, ViewChild } from '@angular/core';
import { Aplicativo } from 'src/app/api/aplicativo.model';
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

  aplicativos: Aplicativo[];
  scroll = false;

  ngOnInit(): void {
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
      this.addMoreItems();

      /*if (this.pessoa. == 1000) {
        event.target.disabled = true;
      }*/

    }, 500);
  }

  ionViewWillEnter(): void{
    this.addMoreItems()
  }

  addMoreItems(): void{
    this.service.getAplicativos().subscribe(response => {
      this.aplicativos = response;
      console.log(this.aplicativos);
    });
  }
}
