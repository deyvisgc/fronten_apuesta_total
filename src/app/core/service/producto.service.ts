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
export class ProductoService {
   isRegisterOrUpdate$: Subject<boolean> = new Subject<boolean>();
   isFormUpdate$: Subject<Producto> = new Subject<Producto>();

  constructor(private http: HttpClient) {}
  getAll(
    page: number,
    size: number,
    filtros: Filter
  ): Observable<any> {
    let fechaIni = '';
    let fechaFin = '';
    if (
      filtros.fechaIni.day !== 0 &&
      filtros.fechaIni.year !== 0 &&
      filtros.fechaIni.month !== 0
    ) {
      const dayIni =
        filtros.fechaIni.day < 10
          ? `0${filtros.fechaIni.day}`
          : filtros.fechaIni.day;
      const dayFin =
        filtros.fechaFin.day < 10
          ? `0${filtros.fechaFin.day}`
          : filtros.fechaFin.day;
      fechaIni = `${filtros.fechaIni.year}-${filtros.fechaIni.month}-${dayIni}`;
      fechaFin = `${filtros.fechaFin.year}-${filtros.fechaFin.month}-${dayFin}`;
    }
    const params = new HttpParams()
      .append('page', page)
      .append('size', size)
      .append('fechaIni', fechaIni)
      .append('fechaFin', fechaFin)
      .append('categoria', filtros.categoria);
    return this.http.get('', { params: params });
  }
  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>('' + `/${id}`);
  }
  register(product: Producto): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>('' + "/", product);
  }
  update(id: number, product: Producto): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      ``,
      product
    );
  }
  delete(id: number) {
    //return this.http.delete<ResponseMessage>(UriConstante.PRODUCT_RESOURCE + `/${id}`);
  }
  saveStatus(status: boolean) {
    this.isRegisterOrUpdate$.next(status);
  }
  setFormUpdate(product: Producto) {
    this.isFormUpdate$.next(product);
  }
}
