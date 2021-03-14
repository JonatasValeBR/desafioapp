import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfilService } from 'src/app/api/perfil.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Perfil } from 'src/app/api/perfil.model';
import { ToastService } from 'src/app/core/toast.service';
import { ErrorHttpService } from 'src/app/core/error-http.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private convert: ErrorHttpService, private toast: ToastService,private service: PerfilService) { }

  perfis: Perfil[];
  scroll = false;
  ngOnInit() {
  }

  ionViewWillEnter(): void{
    this.addMoreItems()
  }

  addMoreItems(): void{
    this.service.getPerfis().subscribe(response => {
      this.perfis = response;
    }, error => {
      error = this.convert.transform(error);
      for(let x of error)
      {
        let msg: string = `${x.fieldName} - ${x.message}`;
        this.toast.show(msg, "toast-error", 3500);
      }
    });
  }

  toggleInfiniteScroll(): void {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    this.scroll = this.infiniteScroll.disabled;
  }


}
