import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UriConstante } from 'src/app/util/UriConstante';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(UriConstante.LISTAR_CLIENTES); 
  }
  getBank(): Observable<any> {
    return this.http.get(UriConstante.OBTENER_BANCO); 
  }
  getComunicacion(): Observable<any> {
    return this.http.get(UriConstante.LISTAR_COMUNICACIONES); 
  }
  getById(id: string): Observable<any> {
    return this.http.get(UriConstante.LISTAR_CLIENTES + "/" + id); 
  }
  register(register: any): Observable<any> {
    return this.http.post<any>(UriConstante.REGISTER_ASESORES_VENTAS + "/", register);
  }
  sendComunicacion(comunicacion: any): Observable<any> {
    return this.http.post<any>(UriConstante.CREATE_COMUNICACIONES + "/", comunicacion);
  }
  sendResponder(res: any): Observable<any> {
    return this.http.post<any>(UriConstante.CREATE_RESPONDER + "/", res);
  }
  recargar(formData: FormData) {
    return this.http.post(UriConstante.RECARGAR_CUENTA, formData);
  }
  updateRecargar(id:string, formData: FormData) {
    const url = UriConstante.UPDATE_RECARGAR_CUENTA.replace("{id}", id)
    return this.http.post(url, formData);
  }
}
