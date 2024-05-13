import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { UriConstante } from 'src/app/util/UriConstante';
import { KeySession } from 'src/app/util/key_session.constante';
import { TokenService } from 'src/app/util/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private htpp: HttpClient, private tokenServ: TokenService, private router: Router) {
  }
  login(email: string, password: string): Observable<any> {
    return this.htpp.
    post<any>(UriConstante.LOGIN, {email, password})
    .pipe(tap(res => {
      this.tokenServ.saveToken(res.access_token)
      this.tokenServ.saveRolLogin(res?.role)
      this.tokenServ.saveSalesId(res?.sales_id)
      this.tokenServ.saveClientId(res?.clientID)
    }));
  }
  logout(): void {
    this.htpp.post<any>(UriConstante.LOGOUT, {});
    this.tokenServ.removeToken()
    this.tokenServ.removeTokenApi()
    this.router.navigate(['/login']);
  }
  buscarXNumeroDocumento(number: string): Observable<any> {
    const URL = UriConstante.BUSCAR_DOCUMENTO.replace("{numDocument}", number)
    return this.htpp.get(URL);
  }
  role(): Observable<any> {
    return this.htpp.get(UriConstante.ROLE);
  }
  departament(): Observable<any> {
    return this.htpp.get(UriConstante.DEPARTAMENTO);
  }
  provincia(id: string): Observable<any> {
    const URL = UriConstante.PROVINCIA.replace("{idDepar}", id)
    return this.htpp.get(URL);
  }
  distrito(id: string): Observable<any> {
    const URL = UriConstante.DISTRITO.replace("{idProv}", id)
    return this.htpp.get(URL);
  }
  registerAndLogin(register: any): Observable<any> {
    return this.htpp
    .post<any>(UriConstante.REGISTER_CLIENT, register)
    .pipe(
      switchMap(() => this.login(register.email, register.password)),
      catchError((err: any) => of(err)),
    );
  }
  // getRol(): Observable<any> {
  //   return this.http.get(UriConstante.ROLE);
  // }
  // getAll(limit: number, offset: number, page: number): Observable<any> {
  //   const params = new HttpParams()
  //     .append('limit', limit)
  //     .append('offset', offset)
  //     .append('page', page);
  //   return this.http.get(UriConstante.ADMIN_RESOURCE, { params: params });
  // }
  // getUsersById(id: number): Observable<any> {
  //   return this.http.get<any>(UriConstante.ADMIN_RESOURCE + `/${id}`);
  // }
}
