import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { EmployeesService } from 'src/app/Services/employees.service';
import { Employee } from 'src/app/models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = /^004\d{10}$/.test(control.value);
    return valid ? null : { invalidPhone: true };
  };
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{
 
  
  addEmployeeReq: Employee={
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department:''
  }
  addEmployeeForm: FormGroup;
  constructor(private employeeService:EmployeesService,private router:Router,private fb: FormBuilder) {
    this.addEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.pattern(/\b[A-Za-z0-9._%+-]+@mail\.com\b/i)]], // Email validation
      phone: ['', [phoneValidator()]], // Phone validation using custom validator
      salary: ['', [Validators.required, Validators.min(5000)]], // Minimum salary validation
      department: ['']
    });
  }
  ngOnInit(): void {
    
  }
  addEmployee(){
    this.employeeService.addEmployee(this.addEmployeeReq)
    .subscribe({
      next: (employee) => {
        this.router.navigate(['employees']);
      }
    })
  }
}



