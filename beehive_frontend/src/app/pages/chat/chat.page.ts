import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

import chatsData from '../../../assets/data/chats.json';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  event_id: any;

  constructor(
    private authServ: AuthService,
    private route: ActivatedRoute
  ) { }


  messages: any;

  currentUser= this.authServ.token;
  newMsg='';
  @ViewChild(IonContent) content: IonContent


  sendMessage(){
    this.messages.push({
      user: this.currentUser,
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });
    this.newMsg='';
    setTimeout(()=>{
      this.content.scrollToBottom(200);
    });

  }

  ngOnInit() {
    this.event_id = this.route.snapshot.paramMap.get('id');
    this.messages= chatsData.chats[(this.event_id)-1].messages;
  }


}
