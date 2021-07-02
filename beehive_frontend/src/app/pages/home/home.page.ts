import { Component } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AddEventPage } from '../add-event/add-event.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
  ) {}

  async openAddEvent() {
    const modal = await this.modalCtrl.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: AddEventPage
    });

    return await modal.present();
  }

}
