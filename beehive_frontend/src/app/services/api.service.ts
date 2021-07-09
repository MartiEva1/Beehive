import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import eventsData from '../../assets/data/events.json';
import { Filter } from './filter.service';

const { Geolocation } = Plugins;

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

  position = {
    lat: 0,
    long: 0,
  }

  constructor(private http: HttpClient) {
    Geolocation.getCurrentPosition().then((pos) => {
      this.position.lat = pos.coords.latitude;
      this.position.long = pos.coords.longitude;

      console.log("POSITION: "+this.position.lat+", "+this.position.long);
    }, error => {
      console.log(error);
    })
  }

  getEventsByCategory(category, username) {
    return this.events.filter(item => item.category === category && item.username !== username && !item.participants.includes(username))
  }

  getEventById(eventId) {
    return this.events.find(item => item.id == eventId);
  }

  getBookedEvents(username) {
    return this.events.filter(event => event.participants.includes(username) && event.username !== username);
  }

  getCreatedEvents(username) {
    return this.events.filter(event => event.username === username);
  }

  postEvent(params: any) {
    params.id = this.events.length + 1;
    params.participants = [ params.username ];
    return this.events.push(params);
  }
  putEvent(eventId, params: any) {
    const event = this.events.find(item => item.id == eventId);
    const participants = event.participants;

    params.participants = participants;
    params.id = eventId;

    this.events = this.events.filter(item => item.id != eventId);
    this.events.push(params);
  }

  deleteEvent(eventId: number){
    for(let el in this.events)
    {
      if(this.events[el].id == eventId)
      {
        this.events[el].participants = [];
        this.events[el].username = '';
      }
    }

    this.events = this.events.filter(event => event.id != eventId);
  }
  leaveEvent(eventId: number, username: string) {
    for(let el in this.events)
    {
      if(this.events[el].id == eventId)
      {
        this.events[el].participants = this.events[el].participants.filter(p => p !== username);
      }
    }
  }

  addParticipantToEvent(eventId: number, participant: string): String {
    let event = this.events.find(item => item.id == eventId);
    if(!event.participants.includes(participant))
    {
      event.participants.push(participant);
    }
    return event.title;
  }
  removeParticipantToEvent(eventId: number, participant: string) {
    let event = this.events.find(item => item.id == eventId);
    event.participants.splice(event.participants.indexOf(participant), 1);
  }

  getEventsWithFilters(events, filters: Filter) {
    let result = events;

    if(filters.distance)
    {
      result = result.filter(item => this.isInRange(item.place.lat, item.place.long, filters.distance));
    }
    if(filters.numberParticipants)
    {
      result = result.filter(item => item.participants.length >= filters.numberParticipants);
    }
    if(filters.fromDate)
    {
      result = result.filter(item => this.isAfter(item.date, filters.fromDate));
    }
    if(filters.toDate)
    {
      result = result.filter(item => this.isBefore(item.date, filters.toDate));
    }
    return result;
  }


  isBefore(date, toDate) {
    let d1 = new Date(date).getTime();
    let d2 = new Date(toDate).getTime();

    return d1 <= d2;
  }
  isAfter(date, fromDate) {
    let d1 = new Date(date).getTime();
    let d2 = new Date(fromDate).getTime();

    console.log(d1);
    console.log(d2);

    return d1 >= d2;
  }

  isInRange(lat: number, long: number, km): Boolean {
    const distanceKM: number = this.getDistanceInKm(this.position.lat, this.position.long, lat, long);
    return distanceKM <= km;
  }
  getDistanceInKm(lat1: number, long1: number, lat2: number, long2: number): number {
    const R = 6371; // Radius of the earth in km

    const differenceLat: number = lat2 - lat1;
    const differenceLong: number = long2 - long1;

    let dLat = this.deg2rad(differenceLat);  
    let dLon = this.deg2rad(differenceLong); 
    
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    
    return d;
  }
  deg2rad(deg: number): number {
    return deg*(Math.PI/180);
  }
}
