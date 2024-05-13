import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './util/token.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router, private tokenServ: TokenService
    ) { }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const expectedRol = route.data["expectedRol"];;
        if (!this.tokenServ.isLoggedInUser() ) {
          this.router.navigate(['/login']);
          return false;
        }
        // role.forEach((r: any) => this.realRol = r);
        // if (expectedRol && expectedRol.indexOf(this.realRol) === -1) {
        //   this.router.navigate(['/account/not-autorized']); // envia no authorizado
        //   return false;
        // }
      return true;
    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     if (this.tokenServ.isLoggedInUser()) {
    //       return true
    //     } else {
    //       this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    //       return true
    //     }
    //     // if (environment.defaultauth === 'firebase') {
    //     //     const currentUser = this.authenticationService.currentUser();
    //     //     if (currentUser) {
    //     //         // logged in so return true
    //     //         return true;
    //     //     }
    //     // } else {
    //     //     const currentUser = this.authFackservice.currentUserValue;
    //     //     if (currentUser) {
    //     //         // logged in so return true
    //     //         return true;
    //     //     }
    //     // }
    //     // not logged in so redirect to login page with the return url
    // }
}