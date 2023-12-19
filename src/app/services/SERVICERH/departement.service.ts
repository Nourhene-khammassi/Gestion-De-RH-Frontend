import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Departement } from 'src/app/modules/rhmodel/departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private baseUrl = 'http://localhost:8080/api/v1/departement';
  
  //springboot-crud-rest
  constructor(private http: HttpClient){}
  public getlistdpt(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.baseUrl}/findbyALL`);
    
  }
  
  public addDpt(Dpt: Departement): Observable<Departement> {
    return this.http.post<Departement>(`${this.baseUrl}/save`, Dpt);
  }

  finddpetById(id: number): Observable<Departement> {
    return this.http.get(`${this.baseUrl}/findbyid/${id}`).pipe(
      map((response:any) => response as Departement)
    );
  }

  public deleteEmployee(DptId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${DptId}`);
  }
}
