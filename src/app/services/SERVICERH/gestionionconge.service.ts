import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Conge } from 'src/app/modules/rhmodel/conge';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionioncongeService {

  baseurl :string = environment.baseurl+"/conge"
  constructor(private http: HttpClient) { 
  }

  public addDpt(Dpt: Conge,id:number): Observable<Conge> {
    return this.http.post<Conge>(`${this.baseurl}/save/${id}`, Dpt);
  }

  public updateconge(Dpt: Conge): Observable<Conge> {
    return this.http.post<Conge>(`${this.baseurl}/update`, Dpt);
  }


  getcongeList(): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.baseurl}/listeall`)
    .pipe(
      map((response:any) => response as Conge[])
    );
  }

  getcongeListempl(id:number): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.baseurl}/finedbyidemployee/${id}`)
    .pipe(
      map((response:any) => response as Conge[])
    );
  }
  deletecong(id: any): Observable<any> {
    return this.http.delete(`${this.baseurl}/delete/${id}`,{ responseType: 'text' });
  }
  getcong(id: number): Observable<Conge> {
    return this.http.get(`${this.baseurl}/finedbyid/${id}`).pipe(
      map((response:any) => response as Conge)
    );
  }
  getemployeemat(matricule: string): Observable<Conge> {
    return this.http.get(`${this.baseurl}/finedbymatricule/${matricule}`).pipe(
      map((response:any) => response as Conge)
    );
  }
  getemployeebyname(name: string): Observable<Conge> {
    return this.http.get(`${this.baseurl}/finedbymatricule/${name}`).pipe(
      map((response:any) => response as Conge)
    );
  }
  public validationconge(id:number,isva:boolean): Observable<Conge> {
    return this.http.get<Conge>(`${this.baseurl}/save/${id}/${isva}`);
  }
}