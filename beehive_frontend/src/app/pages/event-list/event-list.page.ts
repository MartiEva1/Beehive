import { Component, OnInit } from '@angular/core';

import eventsData from '../../../assets/data/events.json';
import { ApiService, Event } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { EditEventPage } from '../edit-event/edit-event.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss']
})
export class EventListPage implements OnInit {
  
  selectedEvents: Array<Event>;
  myEvents: Array<Event>;
  visualizedEvents: Array<Event>;
  currentUser = '';
  allEvents = true;
  buttonLabel = "Leave";
  

  constructor(
    private serv: ApiService, 
    private authServ: AuthService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
  ) { }
  
  ngOnInit() {
    this.currentUser = this.authServ.token;
    
    this.selectedEvents = this.serv.getBookedEvents(this.currentUser);
    this.myEvents = this.serv.getCreatedEvents(this.currentUser);
    
    if(this.allEvents)
    {
      this.visualizedEvents = this.selectedEvents;
    }
    else
    {
      this.visualizedEvents = this.myEvents;
    }
  }

  ionViewWillEnter() {
    this.selectedEvents = this.serv.getBookedEvents(this.currentUser);
    this.myEvents = this.serv.getCreatedEvents(this.currentUser);
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
    if(this.allEvents)
    {
      this.buttonLabel = "Leave";
    }
    else
    {
      this.buttonLabel = "Delete";
    }
  }

  // triggered by leave button
  removeEvent(eventId: number) {
    if(this.allEvents)
    {
      this.alertCtrl.create({
        header: "Are you sure?",
        message: "You will leave the event and the relative chat",
        buttons: [
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Leave",
            handler: () => this.leaveEvent(eventId)
          }
        ]
      }).then(alertEl => {
        alertEl.present();
      });
    }
    else
    {
      this.alertCtrl.create({
        header: "Are you sure?",
        message: "You will delete the event and other participants will be notified about the deletion",
        buttons: [{
          text: "Cancel",
          role: "cancel"
        },{
          text: "Delete",
          handler: () => this.deleteEvent(eventId)
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
  }
  
  async leaveEvent(eventId) {
    const loading = await this.loadingCtrl.create({
      message: "Loading..."
    });
    await loading.present();

    this.serv.leaveEvent(eventId, this.currentUser);
    
    this.selectedEvents = this.serv.getBookedEvents(this.currentUser);

    loading.dismiss();

    const toast = await this.toastCtrl.create({
      header: "Success",
      message: "You have left the event successfully",
      duration: 2000,
      color: "dark"
    });
    await toast.present();
  }

  async deleteEvent(eventId) {
    const loading = await this.loadingCtrl.create({
      message: "Loading..."
    });
    await loading.present();

    this.serv.deleteEvent(eventId);
    
    this.myEvents = this.serv.getCreatedEvents(this.currentUser);

    loading.dismiss();

    const toast = await this.toastCtrl.create({
      header: "Success",
      message: "Event deleted with success",
      duration: 2000,
      color: "dark"
    });
    await toast.present();
  }

  async openEditEvent(eventId) {
    const modal = await this.modalCtrl.create({
      component: EditEventPage,
      componentProps: {
        eventId: eventId
      }
    });

    modal.onDidDismiss().then(() => {
      this.myEvents = this.serv.getCreatedEvents(this.currentUser);
    });

    return await modal.present();
  } 

  getEvents() {
    if(this.allEvents)
    {
      this.visualizedEvents = this.selectedEvents;
    }
    else
    {
      this.visualizedEvents = this.myEvents;
    }
    return this.visualizedEvents;
  }
  openParticipants(event_id: number) {
    this.navCtrl.navigateForward(['/participants', event_id]);
  }

  isAndroid(): Boolean {
    return this.platform.is('android');
  }
}
