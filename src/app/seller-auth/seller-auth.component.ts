import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp, login } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  showLogin = false
  authError:string = ""
  constructor(private seller: SellerService, private router: Router){}

  openLogin(){
    this.showLogin = true
  }
  signIn(data:login){
    //console.log(data)
    this.authError = ''
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((error)=>{

      if(error){
          this.authError = "Email and password are not matching"
      }

    })
  }

  openSignUp(){
    this.showLogin = false
  }
  ngOnInit(){
    this.seller.reloadSeller()
  }
  signUp(data: SignUp):void{
      //console.log(data)
      this.seller.userSignUp(data)
  }
}
