import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(private auth: AuthService, private http: HttpClient) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.idTokenClaims$.pipe(
      map(idTokenClaims => {
        if (idTokenClaims) {
          const roles = idTokenClaims['dev-sy4set8w1ef7zxey.us.auth0.com/roles'];
          return roles && roles.includes('admin');
        }
        return false;
      })
    );
  
  }
}
