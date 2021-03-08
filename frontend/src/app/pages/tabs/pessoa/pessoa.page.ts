import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll} from '@ionic/angular';
import { PessoaService} from 'src/app/api/pessoa.service';
import { VisualizarPessoa, FiltroPessoa } from 'src/app/api/pessoa.model';
import { AlertService } from 'src/app/services/alert.service';

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
  scroll = false;

  ngOnInit(): void {
  }
  ionChange(){
    console.log("alterou o bagulho");
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
    this.service.getPessoas().subscribe(response => {
      this.filtroPessoa = response;
      this.pessoas = this.filtroPessoa['content'];
      console.log(this.pessoas);
    });
  }
}
