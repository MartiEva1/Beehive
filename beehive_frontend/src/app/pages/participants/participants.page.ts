import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import eventsData from '../../../assets/data/events.json';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage implements OnInit {
  
  event_id: any;
  currentUser = '';
  event: any;
  mapboxToken = '';
  
  constructor(
    private authServ: AuthService,
    private route: ActivatedRoute,
    private serv: ApiService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.mapboxToken = environment.mapbox.accessToken;
    this.event_id = this.route.snapshot.paramMap.get('id');
    this.event = this.serv.getEventById(this.event_id);
    this.currentUser= this.authServ.token;
  }

  // return number of participants to the event
  getParticipants(participants: any): Number {
    return participants?.length;
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
  loadMap(lat, long): String {
    return "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+FF3B30("+long+","+lat+")/"+long+","+lat+",15/500x150?access_token="+this.mapboxToken;
  }
}