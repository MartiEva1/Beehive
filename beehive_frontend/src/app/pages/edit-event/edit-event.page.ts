import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

import { Plugins, CameraSource, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {

  eventInfo: FormGroup;

  @Input() eventId: number;

  @ViewChild('imgFile', { static: false }) imgFile: ElementRef;

  constructor(
    private authServ: AuthService,
    private serv: ApiService,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {

    const event = this.serv.getEventById(this.eventId);

    this.eventInfo = this.fb.group({
      title: [event.title, Validators.required],
      category: [event.category, Validators.required],
      description: [event.description, Validators.required],
      date: [event.date, Validators.required],
      hour: [event.hour, Validators.required],
      address: [event.place.address, Validators.required],
      image: [event.img],
    })
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      header: "Success",
      message: 'Event has been edited successfully!',
      duration: 2000,
      color: "dark"
    });
    toast.present();
  }

  async editEvent() {
    const loading = await this.loadingCtrl.create({
      message: "Loading..."
    });
    
    await loading.present();

    let event = this.eventInfo.value;

    let params = {
      category: event.category,
      title: event.title,
      username: this.authServ.token,
      date: event.date,
      hour: event.hour,
      place: {
        address: event.address,
        lat: 12,
        long: 31
      },
      description: event.description,
      img: event.image,
    }

    this.serv.putEvent(this.eventId, params);

    loading.dismiss();

    this.showToast();
    this.dismissModal();
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
    this.eventInfo.patchValue({ image: imgBase64 });
  }
  async takePhoto() {
    const source = CameraSource.Photos;
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source,
    });

    this.eventInfo.patchValue({ image: image.dataUrl });
  }
  toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  setImage(): String {
    if(this.image && this.image.value)
    {
      return this.image.value;
    }
    else
    {
      return "../../assets/images/empty.jpg";
    }
  }

  get title() {
    return this.eventInfo.get('title');
  }
  get category() {
    return this.eventInfo.get('category');
  }
  get username() {
    return this.eventInfo.get('username');
  }
  get date() {
    return this.eventInfo.get('date');
  }
  get hour() {
    return this.eventInfo.get('hour');
  }
  get address() {
    return this.eventInfo.get('address');
  }
  get description() {
    return this.eventInfo.get('description');
  }
  get image() {
    return this.eventInfo.get('image');
  }
}
