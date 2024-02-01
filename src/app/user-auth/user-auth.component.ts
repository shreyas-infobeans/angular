import { Component } from '@angular/core';
import { SignUp, cart, login,product } from '../data-type';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  userloggedin:boolean = true
  authError:string = ""
  openSignup(){
    this.userloggedin = false
  }
  constructor(private user:UserService, private product:ProductService){}
  ngOnInit(){
    this.user.userAuthReload()
  }
  signUp(data:SignUp){
      //console.log(data)
      this.user.userSignUp(data)
  }
  login(data:login){
    this.authError = ''
    this.user.userLogin(data)
    this.user.isLoginError.subscribe((error)=>{

      if(error){
          this.authError = "Email and password are not matching"
      }
      else
      {
        this.localCartToRemoteCart()
      }

    })
  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    if(data){
      let cartDataList:product[] = JSON.parse(data)
      

      cartDataList.forEach((product:product,index) => {

        let cartData:cart = {...product, productId:product.id, userId}
        delete cartData.id
        setTimeout(() => {
          
          this.product.addtoCart(cartData).subscribe((result)=>{

            if(result){
              console.log("Item stored in DB.")
            }
            
          })
        
        }, 500);
        if(cartDataList.length===index+1){

          localStorage.removeItem('localCart')

        }
        
      });
    }
    this.product.getCartList(userId)
  }
}
