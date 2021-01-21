import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Purchase } from '../models/Purchase';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({ providedIn: 'root' })

export class PurchaseService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    postUser() {
      return this.http.post(`${this.baseUrl}/user`, {"user": this.authService.currentUserValue});
    }
    postPurchase(code:number, purchases: Purchase) {
      return this.http.post(`${this.baseUrl}/purchase`, {code, purchases, "user": this.authService.currentUserValue}).pipe(map(user => {
        if (user) {
              // this.authService.logout();
              // location.reload();
            }
        return user;
    }));
    }
    postCredit(credit: number) {
      return this.http.post(`${this.baseUrl}/premiumPurchase`, {credit, "user": this.authService.currentUserValue});
    }

    premiumPurchase(code: number, credit: number) {
      return this.http.post(`${this.baseUrl}/premiumConfirm`, {code, credit, "user": this.authService.currentUserValue}).pipe(map(user => {
        if (user) {
              // this.authService.logout();
              // location.reload();
            }
        return user;
    }));
    }
}
