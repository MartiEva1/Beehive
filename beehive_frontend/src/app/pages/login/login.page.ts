import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
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

  get username() {
    return this.credentials.get('username');
  }
  get password() {
    return this.credentials.get('password');
  }

}
