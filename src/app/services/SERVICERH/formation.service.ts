import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Formation } from 'src/app/modules/rhmodel/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private baseUrl = 'http://localhost:8080/api/v1/formation';
  
  //springboot-crud-rest
  constructor(private http: HttpClient){}
  public getlistdpt(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}/findbyALL`)
    .pipe(
      map((response:any) => response as Formation[])
    );
    
  }
  
  public addDpt(Dpt: Formation): Observable<Formation> {
    console.log("tessssssssssssst",Dpt)
    return this.http.post<Formation>(`${this.baseUrl}/save`, Dpt);
  }

  finddpetById(id: number): Observable<Formation> {
    return this.http.get(`${this.baseUrl}/findbyid/${id}`).pipe(
      map((response:any) => response as Formation)
    );
  }

  public deleteformation(DptId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${DptId}`,{ responseType: 'text' });
  }
  getformationListempl(id:number): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}/finedbyidemployee/${id}`)
    .pipe(
      map((response:any) => response as Formation[])
    );
  }
}


