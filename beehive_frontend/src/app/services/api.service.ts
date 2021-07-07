import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import eventsData from '../../assets/data/events.json';

export interface Event {
  id: Number,
  title: String,
  category: String,
  username: String,
  date: String,
  hour: String,
  place: {
      address: String,
      lat: Number,
      long: Number
  },
  description: String,
  participants: Array<String>,
  isPassed: Boolean,
  img: String
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:3000/events/event';

  events = eventsData.events;

  constructor(
    private http: HttpClient
  ) { }

  getEventsByCategory(category, username) {
    return this.events.filter(item => item.category === category && !item.participants.includes(username))
  }

  postEvent(params: any): Observable<any> {
    return this.http.post(this.url, params);
  }
  deleteEvent(eventId: number){
    this.events = this.events.filter(event => {
      return event.id !== eventId;
    });
  }
}
