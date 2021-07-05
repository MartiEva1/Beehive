import { Component } from '@angular/core';
import { IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
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
    private platform: Platform
  ) {}

  async openAddEvent() {
    const modal = await this.modalCtrl.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: AddEventPage
    });

    return await modal.present();
  }

  isAndroid(): Boolean {
    return this.platform.is('android');
  }
}
