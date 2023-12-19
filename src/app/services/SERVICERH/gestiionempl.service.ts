import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Employee } from 'src/app/modules/rhmodel/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestiionemplService {

  baseurl :string = environment.baseurl+"/employee"
  constructor(private http: HttpClient) { 
  }
  getemployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseurl}/listeall`)
    .pipe(
      map((response:any) => response as Employee[])
    );
  }
  deleteEmployee(id: any): Observable<any> {
    return this.http.delete(`${this.baseurl}/delete/${id}`,{ responseType: 'text' });
  }
  getemployee(id: number): Observable<Employee> {
    return this.http.get(`${this.baseurl}/finedbyidadmin/${id}`).pipe(
      map((response:any) => response as Employee)
    );
  }
  getemployeemat(matricule: string): Observable<Employee> {
    return this.http.get(`${this.baseurl}/finedbymatricule/${matricule}`).pipe(
      map((response:any) => response as Employee)
    );
  }
  getemployeebyname(name: string): Observable<Employee> {
    return this.http.get(`${this.baseurl}/finedbymatricule/${name}`).pipe(
      map((response:any) => response as Employee)
    );
  }
}