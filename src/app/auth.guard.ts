import { Injectable } from '@angular/core';
import { SellerService } from './services/seller.service';

@Injectable({providedIn: 'root'})
export class authGuard {
  constructor(private sellerService: SellerService){}
  canActivate() {

    if(localStorage.getItem('seller')){
     return true;
    }
    return this.sellerService.isSellerLoggedIn;
  }
}

