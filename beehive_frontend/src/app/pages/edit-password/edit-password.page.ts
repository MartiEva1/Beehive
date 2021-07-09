import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

export function MustMatch() {
  return (formGroup: AbstractControl): ValidationErrors | null  => {
    // const control = formGroup.controls[controlName];
    // const matchingControl = formGroup.controls[matchingControlName];
    // if (matchingControl.errors && !matchingControl.errors.mustMatch)
    // {
    //   // return se un altro validator ha trovato un errore
    //   return;
    // }
    // // set error
    // control.value!==matchingControl.value? matchingControl.setErrors({ mustMatch: true }) : matchingControl.setErrors(null);
    
    const password = formGroup.value.newPassword;
    const confirmPassword = formGroup.value.confirmPassword;

    return password !== confirmPassword? { mustMatch: true } : null;
  }
}

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.page.html',
  styleUrls: ['./edit-password.page.scss'],
})

export class EditPasswordPage implements OnInit {

  passwords: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authServ: AuthService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.passwords = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['',  [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',  [ Validators.required, Validators.minLength(6)]],
    }, {
      validators: MustMatch(),
    });
  }
  
  async showAlert(header, message) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      header: "SUCCESS",
      message: 'Your password has been changed with success.',
      duration: 3000,
      color: "dark"
    });
    toast.present();
  }

  async save() {
    let body = {
      username: this.authServ.token,
      oldPassword: this.oldPassword.value,
      newPassword: this.newPassword.value
    };

    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    
    this.authServ.getUser().subscribe((res) => {
      let userID = res._id;
      this.authServ.updatePassword(userID, body).subscribe((res) => {
        loading.dismiss();
        this.showToast();
        this.navCtrl.back();
      }, async (err) => {
        loading.dismiss();
        let header = "Impossibile to change the password";
        let message = "There was an error during the updating of your password, please try again later.";
        await this.showAlert(header, message);
      }), async (error) => {
        loading.dismiss();
        let header = "Impossibile to change the password";
        let message = "There was an error during the updating of your password, please try again later.";
        await this.showAlert(header, message);
      }
    });
  }

  get oldPassword() {
    return this.passwords.get('oldPassword');
  }
  get newPassword() {
    return this.passwords.get('newPassword');
  }
  get confirmPassword() {
    return this.passwords.get('confirmPassword');
  }
}
