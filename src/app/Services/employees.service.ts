import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  baseApiUrl:string="https://localhost:7217";
 

  constructor(private http:HttpClient) { }


  getAllEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>("https://localhost:7217"+'/api/controller');
  }
  addEmployee(addEmployeeReq:Employee):Observable<Employee>{
    addEmployeeReq.id="00000000-0000-0000-0000-000000000000";
    return this.http.post<Employee>("https://localhost:7217"+'/api/controller',addEmployeeReq);
  }
  getEmployee(id:string):Observable<Employee> {
    return this.http.get<Employee>("https://localhost:7217"+'/api/controller/'+id);
  }
  updateEmployee(id:string,updateEmployeeReq:Employee):Observable<Employee> {
    return this.http.put<Employee>("https://localhost:7217"+'/api/controller/'+id,updateEmployeeReq);
  }
  deleteEmployee(id:string):Observable<Employee> {
      return this.http.delete<Employee>("https://localhost:7217"+'/api/controller/'+id);
  }
 
}
