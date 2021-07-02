import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupChatsPageRoutingModule } from './group-chats-routing.module';

import { GroupChatsPage } from './group-chats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupChatsPageRoutingModule
  ],
  declarations: [GroupChatsPage]
})
export class GroupChatsPageModule {}
