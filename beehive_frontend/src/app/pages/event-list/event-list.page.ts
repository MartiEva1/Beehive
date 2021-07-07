import { Component, OnInit } from '@angular/core';

import eventsData from '../../../assets/data/events.json';
import { ApiService, Event } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss']
})
export class EventListPage implements OnInit {
  //events = [...eventsData.events];
  events = eventsData.events;
  selectedEvents: Array<Event>;
  myEvents: Array<Event>;
  visualizedEvents: Array<Event>;
  currentUser = '';
  allEvents = true;
  buttonLabel = "Leave";
  

  constructor(
    private serv: ApiService, 
    private authServ: AuthService,
    private alertCtrl: AlertController
  ) { }
  
  ngOnInit(): void {
    this.currentUser = this.authServ.token;
    
    this.selectedEvents = this.events.filter(event => {
      return (event.participants.includes(this.currentUser)) && (event.username !== this.currentUser); 
    });
    this.myEvents = this.events.filter(event => {
      return event.username === this.currentUser; 
    });
    if(this.allEvents){
      this.visualizedEvents = this.selectedEvents;
    }
    else{
      this.visualizedEvents = this.myEvents;
    }
    //console.log(this.events);
    //console.log(this.currentUser);
    //console.log(this.selectedEvents);
    //console.log(this.myEvents);
  }
  
  // return number of participants to the event
  getParticipants(participants: any): Number {
    return participants.length;
  }

  // used to make date, hour and place look better
  printDate(date: string): String {
    let d = new Date(date);
    return d.toLocaleDateString();
  }
  printHour(hour: string): String {
    let h = new Date(hour);
    return h.toLocaleTimeString();
  }
  printPlace(place: string): String {
    return place.split(',')[0];
  }

  // changes the selection of the events between
  // only created events by current user and all events 
  // which current user participates
  segmentChanged(event: any){
    this.allEvents = !this.allEvents;
    if(this.allEvents){
      this.buttonLabel = "Leave";
    }
    else{
      this.buttonLabel = "Delete";
    }
  }

  // triggered by leave button
  leaveEvent(eventId: number){
    if(this.allEvents){
      this.alertCtrl.create({
        header: "Are you sure?",
        message: "You will leave the event and the relative chat",
        buttons: [{
          text: "Cancel",
          role: "cancel"
        },{
          text: "Leave",
          handler: () => {
            
            this.selectedEvents = this.selectedEvents.filter(event => {
              return event.id !== eventId;
            });
            for(let el in this.events){
              if(this.events[el].id === eventId){
                this.events[el].participants = this.events[el].participants.filter(p => {
                  return p !== this.currentUser; 
                })
              }
            }
            this.visualizedEvents = this.selectedEvents;
          }
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
    else{
      this.alertCtrl.create({
        header: "Are you sure?",
        message: "You will delete the event and other participants will be notified about the deletion",
        buttons: [{
          text: "Cancel",
          role: "cancel"
        },{
          text: "Delete",
          handler: () => {
            
            this.myEvents = this.myEvents.filter(event => {
              return event.id !== eventId;
            });
            for(let el in this.events){
              if(this.events[el].id === eventId){
                this.events[el].participants = [];
                this.events[el].username = '';
              }
            }
            this.events = this.events.filter(event => {
              return event.id !== eventId;
            });
            
            this.visualizedEvents = this.myEvents;
            this.serv.deleteEvent(eventId);
            //console.log(this.events);
          }
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
  }
  getEvents(){
    if(this.allEvents){
      this.visualizedEvents = this.selectedEvents;
    }
    else{
      this.visualizedEvents = this.myEvents;
    }
    return this.visualizedEvents;
  }
}
