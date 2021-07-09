import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { EditProfilePage } from '../edit-profile/edit-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  user: any;

  constructor(
    private authServ: AuthService,
    private toastCtrl: ToastController,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}
  
  ngOnInit() {
    this.authServ.getUserWithToken().then((obs) => {
      obs.subscribe((res) => {
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

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Would you like to exit from the application?',
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: async () => {
            console.log('Cancel');
          }
        },
        {
          text: 'Ok',
          role: 'Ok',
          handler: async () => {
            await this.authServ.logout();
            this.router.navigateByUrl('/login');
          }
        },
      ]
    });
    await alert.present();
  }

  async showToast(header, message) {
    const alert = await this.toastCtrl.create({
      header: header,
      message: message,
      duration: 2000,
      color: "dark"
    });
    await alert.present();
  }

  async editProfile() {
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: {
        'firstName': this.user.first_name,
        'lastName': this.user.last_name,
        'dateOfBirth': this.user.birth,
        'image': this.user.img
      }
    });

    modal.onDidDismiss().then((data) => {
      if(data && data.data && data.data.updated)
      {
        const header = "Updated successfully!";
        const message = "Your account has been updated with success.";
        this.showToast(header, message);

        this.authServ.getUser().subscribe((res) => {
          this.user = res;
        }, async (error) => {
          const alert = await this.alertCtrl.create({
            header: "Loading Error",
            message: "Error during the loading of the user's information, try again later.",
            buttons: ['OK']
          });
          await alert.present();
        });
      }
    });
    return await modal.present();
  }
}
