import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { FormsModule } from '@angular/forms';
import { EditEmployeeComponent } from './components/employees/edit-employee/edit-employee.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Routes } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterComponent } from './components/register/register.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { CategoryComponent } from './components/category/category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { MatTableModule } from '@angular/material/table';
import { TicketsComponent } from './components/tickets/tickets.component';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { AuthInterceptor } from './auth-interceptor.service';
import { EditTicketsComponent } from './components/edit-tickets/edit-tickets.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  
  //{ path: '', redirectTo: '/employees', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent,
    EmployeesListComponent,
    AddEmployeeComponent,
    EditEmployeeComponent, 
    RegisterComponent, CategoryComponent, AddCategoryComponent, TicketsComponent, AddTicketComponent, EditTicketsComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
  
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
   
    AuthModule.forRoot({
      // The domain and clientId were configured in the previous chapter
      domain: 'dev-sy4set8w1ef7zxey.us.auth0.com',
      clientId: 'knnCaqnWXsboxIVkp6QPe6Z68nmZCpM2',     
      
         
      authorizationParams: {
        // Request this audience at user authentication time
        audience: 'https://dev-sy4set8w1ef7zxey.us.auth0.com/api/v2/',
        redirect_uri: window.location.origin,
    
        
      },    
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://dev-sy4set8w1ef7zxey.us.auth0.com/api/v2/' (note the asterisk)
            uri: 'https://dev-sy4set8w1ef7zxey.us.auth0.com/api/v2/*',
            tokenOptions: {
              authorizationParams: {
                // The attached token should target this audience
                audience: 'https://dev-sy4set8w1ef7zxey.us.auth0.com/api/v2/',
    
              }
            }
          }
        ]
      }
}),
  ],
  providers: [AuthService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },AdminGuard], 
  bootstrap: [AppComponent]
})
export class AppModule { }
