import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Commentaire } from 'src/app/modules/rhmodel/commentaire';
import { Noteservice } from 'src/app/modules/rhmodel/noteservice';

@Injectable({
  providedIn: 'root'
})
export class NotserviService {
  private baseUrl = 'http://localhost:8080/api/v1/post';
  private baseUrlcom = 'http://localhost:8080/api/v1/commentair';
  
  //springboot-crud-rest
  constructor(private http: HttpClient){}
  public getlistnot(): Observable<Noteservice[]> {
    return this.http.get<Noteservice[]>(`${this.baseUrl}/findbyALL`)
    
  }
  
  public addDpt(Dpt: Noteservice,id:number): Observable<Noteservice> {
    return this.http.post<Noteservice>(`${this.baseUrl}/save/${id}`, Dpt);
  }

  finddpetById(id: number): Observable<Noteservice> {
    return this.http.get(`${this.baseUrl}/findbyid/${id}`).pipe(
      map((response:any) => response as Noteservice)
    );
  }

  public deleteposte(DptId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${DptId}`,{ responseType: 'text' });
  }
  //commetaire
 public getlistcomt(idpost:number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.baseUrlcom}/finedbyidpost/${idpost}`)
  }
  
  public addcom(Dpt: Commentaire,idpost:number,idempl:number): Observable<Commentaire> {
    return this.http.post<Commentaire>(`${this.baseUrlcom}/save/${idpost}/${idempl}`, Dpt);
  }

  finddpetByIdcom(id: number): Observable<Commentaire> {
    return this.http.get(`${this.baseUrlcom}/findbyid/${id}`).pipe(
      map((response:any) => response as Commentaire)
    );
  }

  public deletecom(DptId: number): Observable<any> {
    return this.http.delete(`${this.baseUrlcom}/delete/${DptId}`,{ responseType: 'text' });
  }

}


