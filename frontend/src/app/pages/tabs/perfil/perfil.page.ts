import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfilService } from 'src/app/api/perfil.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Perfil } from 'src/app/api/perfil.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private service: PerfilService) { }

  perfis: Perfil[];
  scroll = false;
  ngOnInit() {
  }

  editarPerfil(id: number): void{
    console.log(id);
  }

  excluirPerfil(id: number): void{
    console.log(id);
  }

  visualizarPerfil(id: number): void{
    console.log(id);
  }

  ionViewWillEnter(): void{
    this.addMoreItems()
  }

  addMoreItems(): void{
    this.service.getPerfis().subscribe(response => {
      this.perfis = response;
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

}
