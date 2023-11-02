import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/employees/edit-employee/edit-employee.component';
import { AdminGuard } from './admin.guard'; 
import { CategoryComponent } from './components/category/category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { EditTicketsComponent } from './components/edit-tickets/edit-tickets.component';
import { AppComponent } from './app.component';
import { RoleGuardService } from './role-guard.service';
const routes: Routes = [
  {
    path: '',
    component:EmployeesListComponent
  },
  
  {
    path: 'employees',
    component:EmployeesListComponent
    
  },
  {
    path: 'employees/add',
    component:AddEmployeeComponent,
    canActivate: [AdminGuard]

  },
  {
    path: 'employees/edit/:id',
    component:EditEmployeeComponent,
    canActivate: [AdminGuard]
    
 
  },
  {
    path:'categories',
    component:CategoryComponent
  },
  {
    path:'categories/add',
    component:AddCategoryComponent,
    canActivate: [AdminGuard]
  },
  {
    path:'tickets',
    component:TicketsComponent
  },
  {
    path:'tickets/add',
    component:AddTicketComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'tickets/edit/:id',
    component:EditTicketsComponent
  },
  { path: '', 
    component: AppComponent, 
    canActivate: [RoleGuardService] 
  }
  
  
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
