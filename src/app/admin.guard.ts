import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.idTokenClaims$.pipe(
      map(idTokenClaims => {
        if (idTokenClaims) {
          const roles = idTokenClaims['dev-sy4set8w1ef7zxey.us.auth0.com/roles']; 
          console.log(roles);
          return roles && roles.includes('admin');
        }
        return false;
      })
    );
  }
}
