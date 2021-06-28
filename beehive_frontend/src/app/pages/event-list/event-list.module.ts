import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventListPage } from './event-list.page';

import { EventListPageRoutingModule } from './event-list-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventListPageRoutingModule
  ],
  declarations: [EventListPage]
})
export class EventListPageModule {}
