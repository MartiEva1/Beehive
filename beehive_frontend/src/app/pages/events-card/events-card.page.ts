import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.page.html',
  styleUrls: ['./events-card.page.scss'],
})
export class EventsCardPage implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
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

  decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    padding = typeof padding === 'undefined' || padding === null ? (padding = 2) : padding;

    while(hex.length < padding)
    {
      hex = '0' + hex;
    }
    return hex;
  }

}
