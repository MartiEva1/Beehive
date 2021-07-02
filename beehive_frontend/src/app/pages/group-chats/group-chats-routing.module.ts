import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupChatsPage } from './group-chats.page';

const routes: Routes = [
  {
    path: '',
    component: GroupChatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupChatsPageRoutingModule {}
