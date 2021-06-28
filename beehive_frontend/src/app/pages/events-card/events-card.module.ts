import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsCardPageRoutingModule } from './events-card-routing.module';

import { EventsCardPage } from './events-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsCardPageRoutingModule
  ],
  declarations: [EventsCardPage]
})
export class EventsCardPageModule {}
