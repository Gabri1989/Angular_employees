import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/Services/employees.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [];
  sortBySalaryAscending = true;
  sortByNameAscending: boolean = true;
  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.employeesService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  toggleSortBySalary() {
    this.sortBySalaryAscending = !this.sortBySalaryAscending;
    this.sortEmployeesBySalary();
  }

  sortEmployeesBySalary() {
    this.employees.sort((a, b) => {
      if (this.sortBySalaryAscending) {
        return a.salary - b.salary;
      } else {
        return b.salary - a.salary;
      }
    });
  }
  sortByName(): void {
    this.sortByNameAscending = !this.sortByNameAscending;
    this.employees.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return this.sortByNameAscending ? -1 : 1;
      }
      if (nameA > nameB) {
        return this.sortByNameAscending ? 1 : -1;
      }
      return 0;
    });
  }
}
