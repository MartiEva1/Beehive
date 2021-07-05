import { AfterViewInit, Component, ElementRef, NgZone, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, GestureController, IonCard, ModalController, Platform } from '@ionic/angular';
import { ApiService, Event } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.page.html',
  styleUrls: ['./events-card.page.scss'],
})
export class EventsCardPage implements OnInit, AfterViewInit { 
  title: String;
  category: String;

  events: Array<Event>;

  mapboxToken: String;

  @ViewChildren("cardEvents", { read: ElementRef }) cards: QueryList<ElementRef>;

  constructor(
    private platform: Platform,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private serv: ApiService,
    private authServ: AuthService,
    private gestureCtrl: GestureController,
  ) { }
  
  
  ngOnInit(): void {
    this.mapboxToken = environment.mapbox.accessToken;

    this.category = this.route.snapshot.paramMap.get('category');
    this.title = this.category.substring(0,1).toUpperCase() + this.category.substring(1)+" Events";

    this.events = this.serv.getEventsByCategory(this.category, this.authServ.token).reverse();
  }

  ngAfterViewInit() {
    const cardArray = this.cards.toArray();
    console.log(cardArray);
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
        onStart: ev => {

        },
        onMove: ev => {
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX/10}deg)`;
          this.setCardColor(ev.deltaX, card.nativeElement);
        },
        onEnd: ev => {
          card.nativeElement.style.transition = "1s ease-out";

          if(ev.deltaX > 150)
          {
            card.nativeElement.style.transform = `translateX(${this.platform.width()*2}px) rotate(${ev.deltaX/2}deg)`;
          }
          else if(ev.deltaX < -150)
          {
            card.nativeElement.style.transform = `translateX(-${this.platform.width()*2}px) rotate(${ev.deltaX/2}deg)`;
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
}
