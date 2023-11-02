// authentification.service.ts
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private auth: AuthService) {
    // Subscribe to auth.user$ to listen for authentication changes
    auth.user$.subscribe((user) => {
      if (user) {
        // Assuming you have access to user's data from the authentication response
        const modifiedUser = {
          ...user,
          profilePhotoUrl: 'adi.jpg' // Set the profile photo URL here
        };
        this.userSubject.next(modifiedUser);
      } else {
        this.userSubject.next(null);
      }
    });
  }
}
