import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  @ViewChild(IonSlides)slides: IonSlides;

  constructor(private router: Router, private route: ActivatedRoute) { }

  next() {
    this.slides.slideNext();
  }

  ngOnInit() {
  }

  async start() {
    const help = this.route.snapshot.paramMap.get('help');

    if(help === "true")
    {
      this.router.navigateByUrl('/help', { replaceUrl: true });
    }
    else
    {
      await Storage.set({key: INTRO_KEY, value: 'true'});
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }
}
