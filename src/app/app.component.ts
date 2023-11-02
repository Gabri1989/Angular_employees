import { Component, Inject, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgZone } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
 
  constructor(@Inject(DOCUMENT) public document: Document,public auth: AuthService,private http:HttpClient,private zone: NgZone) { }
    
 
  token:any;
  ngOnInit(): void {
    this.auth.user$.subscribe((value)=>{})
  this.auth.getAccessTokenSilently().subscribe((value)=>{
    console.log("token",value)
    this.token=value;
  }), (error:any)=>{console.error(error);};
  /* this.http.get(`https://dev-sy4set8w1ef7zxey.us.auth0.com/api/v2/users/64dc88e5b160e37c8c380a42/roles`).pipe(
      map(res => {
        if(res){
          console.log(res)
        }

        return false
      })
    ).subscribe() */
  this.auth.user$.subscribe(user => {
    console.log(user ? user["https://dev-sy4set8w1ef7zxey.us.auth0.com/roles"] : null)
  })
 }
}

  
  





  
  



  
  
  
