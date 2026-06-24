import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    private apiUrl =
      environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // CREATE

  createEmployee(
    data: FormData
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-employee`,

      data

    );

  }

  // GET ALL

  getAllEmployees():
    Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-all-employees`

    );

  }

  // GET BY ID

  getEmployeeById(
    id: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-employeebyid/${id}`

    );

  }

  // UPDATE

  updateEmployee(
    id: string,
    data: FormData
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-employee/${id}`,

      data

    );

  }

  // DELETE

  deleteEmployee(
    id: string
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/delete-employee/${id}`

    );

  }
}
