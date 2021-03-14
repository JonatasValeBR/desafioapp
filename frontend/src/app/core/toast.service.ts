import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subject, from, Subscription, Observable } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';
import { bufferDebounceTime } from './bufferDebounce';


interface ToastData {
  message: string,
  duration: number,
  position: any,
  css: string
}


@Injectable({
  providedIn: 'root'
})
export class ToastService implements OnDestroy {

  toastSubject: Subject<ToastData> = new Subject<ToastData>();
  groupedByDebounceSubscription: Subscription;
  debouncedSubscription: Subscription;

  constructor(private toastCtrl: ToastController) {

    this.toastSubject = new Subject<ToastData>();
    const toastObservable: Observable<ToastData> = this.toastSubject.asObservable();

    this.groupedByDebounceSubscription = toastObservable
      .pipe(
        bufferDebounceTime(500),
        filter(x => x.length > 0),
        concatMap(x => this.present({
          message: x.map(i => i.message).join('\n'),
          duration: x[0].duration,
          position: x[0].position,
          css: x[0].css
        })),
      )
      .subscribe();


  }

  ngOnDestroy(): void {
    this.groupedByDebounceSubscription.unsubscribe();
  }

  show(message: string, css: string = "toast-default", duration: number = 3000, position: any = "top" ) {
    this.toastSubject.next({
      message,
      duration,
      position,
      css
    })
  }

  async present(x: ToastData) {
    const toast = await this.toastCtrl.create({
      message: x.message,
      duration: x.duration,
      position: x.position,
      cssClass: x.css
    });

    await toast.present();
    const t = await toast.onDidDismiss();
    return true;
  }

}
