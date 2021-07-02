import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import eventsData from '../../assets/data/events.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:3000/events/event';

  events = eventsData.events;

  constructor(
    private http: HttpClient
  ) { }

  postEvent(params: any): Observable<any> {
    return this.http.post(this.url, params);
  }
}
