import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  user: any;

  constructor(
    private authServ: AuthService,
    private alertCtrl: AlertController,
  ) {}
  
  ngOnInit() {
    this.authServ.getUser().then((obs) => {
      obs.subscribe((res) => {
        console.log(res);
        this.user = res;
      }, async (error) => {
        const alert = await this.alertCtrl.create({
          header: "Loading Error",
          message: error.error.message,
          buttons: ['OK']
        });
        await alert.present();
      });
    });
  }

  birthDate(date: string): string {
    let d: Date = new Date(date);
    return d.toDateString().substring(4);
  }

}
