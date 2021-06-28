import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsCardPage } from './events-card.page';

const routes: Routes = [
  {
    path: '',
    component: EventsCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsCardPageRoutingModule {}
