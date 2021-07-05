import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

import eventsData from '../../../assets/data/events.json';

@Component({
  selector: 'app-group-chats',
  templateUrl: './group-chats.page.html',
  styleUrls: ['./group-chats.page.scss'],
})
export class GroupChatsPage implements OnInit {
  
  events = eventsData.events;
  

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  openChat(id: number) {
    this.navCtrl.navigateForward(['/chat', id]);
  }


}
