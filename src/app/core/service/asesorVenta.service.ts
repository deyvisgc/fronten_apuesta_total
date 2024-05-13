import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UriConstante } from 'src/app/util/UriConstante';
import { Filter } from '../interface/filtros.request';
import { Producto } from '../interface/producto.interface';
import { ResponseMessage } from '../interface/message.response';

@Injectable({
  providedIn: 'root',
})
export class AsesorVentaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(UriConstante.LISTAR_ASESORES_VENTAS); 
  }
  getComunicacion(): Observable<any> {
    return this.http.get(UriConstante.LISTAR_COMUNICACIONES); 
  }
  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>('' + `/${id}`);
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
}
