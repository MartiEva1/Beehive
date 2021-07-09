import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authServ: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) 
      {
        // return se un altro validator ha trovato un errore
        return;
      }
      // set error
      control.value!==matchingControl.value? matchingControl.setErrors({ mustMatch: true }) : matchingControl.setErrors(null);
    }
  }

  ngOnInit() {
    this.user = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      birth: ['', Validators.required],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
    }, {
      validators: [
        this.mustMatch('password', 'confirm_password'),
      ]
    });
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: "Success!",
      message: 'You are officially a new Beehive member. WELCOME AND ENJOY!',
    });
    await alert.present();

    setTimeout(() => {
      alert.dismiss();
    }, 3000);
  }

  async signIn() {
    const loading = await this.loadingCtrl.create({
      message: "Loading..."
    });
    await loading.present();
    
    this.authServ.signin(this.user.value).subscribe(async (res) => {
      await loading.dismiss();
      this.showAlert();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }, async (error) => {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: "Sign up failed",
        message: error.error.message,
        buttons: ['OK']
      });

      await alert.present();
    });
  }

  get first_name() {
    return this.user.get('first_name');
  }
  get last_name() {
    return this.user.get('last_name');
  }
  get birth() {
    return this.user.get("birth");
  }
  get username() {
    return this.user.get('username');
  }
  get password() {
    return this.user.get('password');
  }
  get confirm_password() {
    return this.user.get('confirm_password');
  }

}
