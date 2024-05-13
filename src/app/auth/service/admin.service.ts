import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private permisos = new BehaviorSubject<any>([]);
  datos$ = this.permisos.asObservable();
  constructor(private http: HttpClient) {
    
  }
  
  // delete(id: number) {
  //   return this.http.delete<any>(UriConstante.ADMIN_RESOURCE + `/${id}`);
  // }
  // getCountDashboard(): Observable<any> {
  //   return this.http.get<any>(`${UriConstante.ADMIN_RESOURCE}/count-total`);
  // }
  // getPermisos(): Observable<any> {
  //   return this.http.get<any>(`${UriConstante.ADMIN_RESOURCE}/permisos`);
  // }
  // getPermisosById(id: number): Observable<any> {
  //   return this.http.get<any>(`${UriConstante.ADMIN_RESOURCE}/permisos/${id}`);
  // }
  // addPermisosObservable(lista: any) {
  //   this.permisos.next(lista);
  // }
}
