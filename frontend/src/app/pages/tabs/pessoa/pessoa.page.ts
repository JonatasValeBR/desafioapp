import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { PessoaService} from 'src/app/api/pessoa.service';
import { Pessoa, FiltroPessoa } from 'src/app/api/pessoa.model';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.page.html',
  styleUrls: ['./pessoa.page.scss'],
})
export class PessoaPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private service: PessoaService) { }

  filtroPessoa: FiltroPessoa;
  pessoas: Pessoa[];
  scroll = false;

  ngOnInit(): void {
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

  ionChange(){
    console.log("alterou o bagulho");
  }

  editarPessoa(id: number): void{
    console.log(id);
  }

  excluirPessoa(id: number): void{
    console.log(id);
  }

  visualizarPessoa(id: number): void{
    console.log(id);
  }

}
