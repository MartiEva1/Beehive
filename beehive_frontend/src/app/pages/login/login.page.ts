import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authServ: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    const deleted = this.route.snapshot.paramMap.get('deleted');
    if(deleted === "true")
    {
      this.showToast();
    }

    this.credentials = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      header: "Success",
      message: 'Your account has been deleted, thank you for beeing with us.',
      duration: 3000,
      color: "dark"
    });
    toast.present();
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: "Confirm",
      message: 'All the steps of the procedure for recovering the password are sent to the email.',
      buttons: ['Ok'],
    });
    await alert.present();
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: "Loading..."
    });
    await loading.present();

    this.authServ.login(this.credentials.value).subscribe(async (res) => {
      await loading.dismiss();
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    }, async (error) => {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: "Login failed",
        message: error.error.message,
        buttons: ['OK']
      });

      await alert.present();
    });
    
  }

  async passwordRecovery() {
    const alert = await this.alertCtrl.create({
      header: 'Password recovery',
      message: "Insert the email to which we send the all steps of the procedure for recovering the password:",
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Insert your email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: () => {
            this.showAlert();
          }
        }
      ]
    });

    await alert.present();
  }

  get username() {
    return this.credentials.get('username');
  }
  get password() {
    return this.credentials.get('password');
  }
}
