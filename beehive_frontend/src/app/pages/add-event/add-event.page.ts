import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  eventInfo: FormGroup;

  constructor(
    private authServ: AuthService,
    private serv: ApiService,
    private modalController: ModalController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.eventInfo = this.fb.group({
      title: ["", Validators.required],
      category: ["", Validators.required],
      description: [""],
      date: ["", Validators.required],
      hour: ["", Validators.required],
      address: ["", Validators.required],
      image: [""],
    })
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  postEvent() {
    // readonly category: String;
    // readonly title: String;
    // readonly username: String;
    // readonly date: Date;
    // readonly hour: Date;
    // readonly place: {via: String, lat: String, long: String};
    // readonly description: String;
    // img: String;
    // partecipants: [String];
    // is_passed: Boolean;
    // readonly created_at: Date;
    
    let event = this.eventInfo.value;

    let params = {
      category: event.category,
      title: event.title,
      username: this.authServ.token,
      date: event.date,
      hour: event.hour,
      place: {
        via: event.address,
        lat: 12,
        long: 31
      },
      description: event.description,
    }

    this.serv.postEvent(params).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }
}
