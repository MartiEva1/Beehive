import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

import { Plugins, CameraSource, CameraResultType } from '@capacitor/core';
import { Router } from '@angular/router';

const { Camera } = Plugins;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() dateOfBirth: string;
  @Input() image: string;

  @ViewChild('imgFile', { static: false }) imgFile: ElementRef;

  user: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private authServ: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.fb.group({
      first_name: [this.firstName, Validators.required],
      last_name: [this.lastName, Validators.required],
      birth: [this.dateOfBirth, Validators.required],
      img: [this.image],
    })
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async showAlert(header, message) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async save() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    
    this.authServ.getUser().subscribe((res) => {
      let userID = res._id;

      this.authServ.updateUser(userID, this.user.value).subscribe((res) => {
        loading.dismiss();
        this.modalCtrl.dismiss({
          'updated': true,
        });
      }, async (err) => {
        loading.dismiss();
        let header = "Impossibile to update";
        let message = "There was an error during the updating of your profile, please try again later.";
        await this.showAlert(header, message);
      }), async (error) => {
        loading.dismiss();
        let header = "Impossibile to update";
        let message = "There was an error during the updating of your profile, please try again later.";
        await this.showAlert(header, message);
      }
    });
  }

  async deleteAccount() {
    const alert = await this.alertCtrl.create({
      header: "Delete account",
      message: "Are you sure you want to delete your account?",
      buttons: [{
        text: 'No'
      },
      {
        text: 'Yes',
        handler: () => this.delete(),
      }
    ]
    });
    await alert.present();
  }

  async delete() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    this.authServ.getUser().subscribe((res) => {
      let userID = res._id;

      this.authServ.deleteUser(userID).subscribe((res) => {
        loading.dismiss();
        this.router.navigateByUrl('/login/true');
        this.dismiss();
      }, async (err) => {
        let header = "Impossibile to delete your account";
        let message = "There was an error during the elimination of your account, please try again later."
        await this.showAlert(header, message);
      }), async (error) => {
        let header = "Impossibile to delete your account";
        let message = "There was an error during the elimination of your account, please try again later."
        await this.showAlert(header, message);
      }
    });
  }

  getImage(): String {
    return this.img.value;
  }

  async addImage() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select File Source',
      buttons: [
        {
          text: 'Take a photo',
          icon: 'camera-outline',
          handler: () => this.takePhoto(),
        }, 
        {
          text: 'Choose an image',
          icon: 'image-outline',
          handler: () => this.choosePhoto(),
        },
      ]
    });
    await actionSheet.present();
  }
  choosePhoto() {
    this.imgFile.nativeElement.click();
  }
  async showImage($event) {
    const file = $event.target.files[0];
    const imgBase64 = await this.toBase64(file);
    this.user.patchValue({ img: imgBase64 });
  }
  async takePhoto() {
    const source = CameraSource.Photos;
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source,
    });

    this.user.patchValue({ img: image.dataUrl });
  }
  toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  get first_name() {
    return this.user.get('first_name');
  }
  get last_name() {
    return this.user.get('last_name');
  }
  get birth() {
    return this.user.get('birth');
  }
  get img() {
    return this.user.get('img');
  }
}
