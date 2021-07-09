import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  
  constructor(private authServ: AuthService, private router: Router) {};

  canLoad(): Observable<boolean> {
    return this.authServ.isAuthenticated.pipe(
      filter(val => val!== null),
      take(1),
      map(isAuthenticated => {
        if(isAuthenticated) 
        {
          this.router.navigateByUrl('/tabs', { replaceUrl: true});
        } 
        else 
        {
          return true;
        }
      })
    );
  }
}
