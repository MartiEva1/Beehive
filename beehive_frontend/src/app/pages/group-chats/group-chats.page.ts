import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

import eventsData from '../../../assets/data/events.json';

@Component({
  selector: 'app-group-chats',
  templateUrl: './group-chats.page.html',
  styleUrls: ['./group-chats.page.scss'],
})
export class GroupChatsPage implements OnInit {
  
  events = eventsData.events;
  currentUser= this.authServ.token;
  

  constructor(private navCtrl: NavController,private authServ: AuthService) { }

  ngOnInit() {
  }

  openChat(id: number) {
    this.navCtrl.navigateForward(['/chat', id]);
  }


}
