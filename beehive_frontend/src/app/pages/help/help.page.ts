import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  scrollTo(id: string) {
    let y = document.getElementById(id).offsetTop;
    this.content.scrollToPoint(0, y);
  }

  openTutorial() {
    this.router.navigateByUrl('/intro/true');
  }
}
