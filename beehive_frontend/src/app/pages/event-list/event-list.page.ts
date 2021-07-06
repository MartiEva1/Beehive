import { Component, OnInit } from '@angular/core';

import eventsData from '../../../assets/data/events.json';
import { ApiService, Event } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss']
})
export class EventListPage implements OnInit {
  events = [...eventsData.events];
  selectedEvents: Array<Event>;
  myEvents: Array<Event>;
  visualizedEvents: Array<Event>;
  currentUser = '';
  allEvents = true;
  

  constructor(
    private serv: ApiService, 
    private authServ: AuthService
  ) { }
  
  ngOnInit(): void {
    this.currentUser = this.authServ.token;
    
    this.selectedEvents = this.events.filter(event => {
      return event.participants.includes(this.currentUser); 
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
    console.log(this.events);
    console.log(this.currentUser);
    console.log(this.selectedEvents);
    console.log(this.myEvents);
  }
  
  getParticipants(participants: any): Number {
    return participants.length;
  }
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
  segmentChanged(event: any){
    this.allEvents = !this.allEvents;
  }
  leaveEvent(eventId: number){
    this.events = this.events.filter(event => {
      return event.id !== eventId;
    })
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
