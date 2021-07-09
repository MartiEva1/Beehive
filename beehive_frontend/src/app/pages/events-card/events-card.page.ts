import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, AnimationController, GestureController, IonRouterOutlet, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ApiService, Event } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Filter, FilterService } from 'src/app/services/filter.service';
import { environment } from 'src/environments/environment';
import { FiltersPage } from '../filters/filters.page';
import { TutorialPage } from '../tutorial/tutorial.page';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.page.html',
  styleUrls: ['./events-card.page.scss'],
})
export class EventsCardPage implements OnInit, AfterViewInit { 
  title: String;
  category: String;

  events: Array<Event>;
  allEvents: Array<Event>;

  mapboxToken: String;

  filtersCount: BehaviorSubject<number>;

  @ViewChildren("cardEvents", { read: ElementRef }) cards: QueryList<ElementRef>;

  constructor(
    private platform: Platform,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private serv: ApiService,
    private authServ: AuthService,
    private gestureCtrl: GestureController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private animationCtrl: AnimationController,
    private filterServ: FilterService,
    private routerOutlet: IonRouterOutlet,
  ) { }
  
  
  ngOnInit() {
    this.mapboxToken = environment.mapbox.accessToken;

    this.category = this.route.snapshot.paramMap.get('category');
    this.title = this.category.substring(0,1).toUpperCase() + this.category.substring(1)+" Events";

    this.events = this.serv.getEventsByCategory(this.category, this.authServ.token).reverse();

    this.allEvents = this.events;
    this.filterServ.removeAllFilters();
    this.filtersCount = this.filterServ.getFiltersCount();
  }

  ngAfterViewInit() {
    const cardArray = this.cards.toArray();
    this.swipeCard(cardArray);
  }

  swipeCard(cardArray) {
    for(let i = 0; i < cardArray.length; i++)
    {
      const card = cardArray[i];

      const gestureX = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: "swipe",
        gesturePriority: 10,
        onStart: ev => {},
        onMove: ev => {
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX/10}deg)`;
          this.setCardColor(ev.deltaX, card.nativeElement);
        },
        onEnd: ev => {
          card.nativeElement.style.transition = "1s ease-out";

          if(ev.deltaX > 150)
          {
            card.nativeElement.style.transform = `translateX(${this.platform.width()*2}px) rotate(${ev.deltaX/2}deg)`;
            this.participateToEvent(card);
          }
          else if(ev.deltaX < -150)
          {
            card.nativeElement.style.transform = `translateX(-${this.platform.width()*2}px) rotate(${ev.deltaX/2}deg)`;
            this.skipEvent(card, true);
          }
          else
          {
            card.nativeElement.style.transform = "";
            this.setDefaultColor(card.nativeElement);
          }
        }
      });
      gestureX.enable();

      const gestureY = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: "swipe",
        direction: "y",
        onStart: ev => {

        },
        onMove: ev => {
          if(ev.deltaY < 0)
          {
            card.nativeElement.style.transform = `translateY(${ev.deltaY}px)`;
            this.setCardColorSwipeUp(ev.deltaY, card.nativeElement);
          }
        },
        onEnd: ev => {
          card.nativeElement.style.transition = "1s ease-out";

          if(ev.deltaY < -150)
          {
            card.nativeElement.style.transform = `translateY(-${this.platform.height()*2}px) rotate(${ev.deltaX/2}deg)`;
            this.skipEvent(card, false);
          }
          else
          {
            card.nativeElement.style.transform = "";
            this.setDefaultColor(card.nativeElement);
          }
        }
      });
      gestureY.enable();
    }
  }

  // OPERATION SWIPE RIGHT
  participateToEvent(card) {
    const eventID = parseInt(card.nativeElement.id);
    const title = this.serv.addParticipantToEvent(eventID, this.authServ.token);

    let header = "Joined";
    let message = "You have joined to "+title;
    this.showToastJoin(header, message, card);

    this.events = this.events.filter(item => item.id !== eventID);
  }
  cancelParticipation(card) {
    const eventID = parseInt(card.nativeElement.id);
    const event = this.serv.getEventById(eventID);

    this.events.push(event);

    card.nativeElement.style.transform = "";
    this.setDefaultColor(card.nativeElement);

    this.cards.changes.subscribe(() => {
      this.swipeCard(this.cards.toArray());
    });

    this.serv.removeParticipantToEvent(eventID, this.authServ.token);
  }
  async showToastJoin(header, message, card) {
    const toast = await this.toastCtrl.create({
      header: header,
      message: message,
      duration: 3000,
      color: "dark",
      buttons: [
        {
          side: 'end',
          text: 'Cancel',
          handler: () => {
            this.cancelParticipation(card);
          }
        }
      ]
    });
    await toast.present();
  }
  
  // OPERATION SWIPE LEFT or UP
  skipEvent(card, refused) {
    const eventID = parseInt(card.nativeElement.id);
    const title = this.serv.getEventById(eventID).title;

    let header, message;
    if(refused)
    {
      header = "Refused";
      message = "You have refused "+title;
    }
    else
    {
      header = "Postponed";
      message = "You have postponed "+title;
    }
    
    this.showToastSkip(header, message, card);
    this.events = this.events.filter(item => item.id !== eventID);
  }
  cancel(card) {
    const eventID = parseInt(card.nativeElement.id);
    const event = this.serv.getEventById(eventID);

    this.events.push(event);

    card.nativeElement.style.transform = "";
    this.setDefaultColor(card.nativeElement);

    this.cards.changes.subscribe(() => {
      this.swipeCard(this.cards.toArray());
    });
  }
  async showToastSkip(header,message,card) {
    const toast = await this.toastCtrl.create({
      header: header,
      message: message,
      duration: 3000,
      color: "dark",
      buttons: [
        {
          side: 'end',
          text: 'Cancel',
          handler: () => {
            this.cancel(card);
          }
        }
      ]
    });
    await toast.present();
  }

  // HELP FUNCTIONS
  setDefaultColor(element) {
    const preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if(preferDark)
    {
      element.style.background = "var(--ion-background-color)";
    }
    else
    {
      element.style.background = "white";
    }
  }
  setCardColor(x, element) {
    let color = "";
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16*16 - abs, 16*16));
    const hexCode = this.decimalToHex(min, 2);

    if(x < 0)
    {
      color = '#FF' + hexCode + hexCode;
    }
    else
    {
      color = "#" + hexCode + 'FF' + hexCode;
    }

    element.style.background = color;
  }
  setCardColorSwipeUp(y, element) {
    let color = "";
    const abs = Math.abs(y);
    const min = Math.trunc(Math.min(16*16 - abs, 16*16));
    const hexCode = this.decimalToHex(min, 2);

    color = "#FFF" + hexCode[1] + hexCode;

    element.style.background = color;
  }
  decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    padding = typeof padding === 'undefined' || padding === null ? (padding = 2) : padding;

    while(hex.length < padding)
    {
      hex = '0' + hex;
    }
    return hex;
  }

  isAndroid(): Boolean {
    return this.platform.is('android');
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
  loadMap(lat, long): String {
    return "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+FF3B30("+long+","+lat+")/"+long+","+lat+",15/500x150?access_token="+this.mapboxToken;
  }

  // WITH THE USE OF BUTTONS
  refuse() {
    const pos = this.events.length-1
    const event = this.events[pos];

    const card = this.cards.toArray()[pos];

    this.animationCtrl.create()
      .addElement(card.nativeElement)
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px) rotate(0deg)', 'translateX(-600px) rotate(-45deg)')
      .fromTo('background', 'white', '#EBAEAE')
      .easing('ease-out')
      .play()
      .then(() => this.skipEvent(card, true));
  }
  join() {
    const pos = this.events.length-1
    const event = this.events[pos];

    const card = this.cards.toArray()[pos];

    this.animationCtrl.create()
      .addElement(card.nativeElement)
      .duration(800)
      .iterations(1)
      .fromTo('transform', 'translateX(0px) rotate(0deg)', 'translateX(600px) rotate(45deg)')
      .fromTo('background', 'white', '#9DE59A')
      .easing('ease-out')
      .play()
      .then(() => this.participateToEvent(card));
  }
  postpone() {
    const pos = this.events.length-1
    const event = this.events[pos];

    const card = this.cards.toArray()[pos];

    const animation = this.animationCtrl.create()
      .addElement(card.nativeElement)
      .duration(800)
      .iterations(1)
      .fromTo('transform', 'translateY(0px)', 'translateY(-800px)')
      .fromTo('background', 'white', '#FFEDA3')
      .easing('ease-out')
      .play()
      .then(() => {
        this.skipEvent(card, false)
      });
  }

  // FILTERS
  ifFilters(): Boolean {
    return this.filtersCount.value? true:false;
  }
  async openFilters() {
    const modal = await this.modalCtrl.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: FiltersPage
    });

    modal.onDidDismiss().then(async (data) => {
      if(data && data.data)
      {
        const loading = await this.loadingCtrl.create({
          message: "Loading..."
        });
        await loading.present();
        
        let filters: Filter = data.data;
        this.events = this.serv.getEventsWithFilters(this.allEvents, filters);

        this.cards.changes.subscribe(() => {
          this.swipeCard(this.cards.toArray());
        });

        loading.dismiss();
      }
    })

    return await modal.present();
  }

  // TUTORIAL
  async openTutorial() {
    const modal = await this.modalCtrl.create({
      component: TutorialPage,
      cssClass: 'transparent-modal'
    });

    await modal.present();
  }
}
