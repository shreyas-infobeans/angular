import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  totalPrice:number|undefined
  cartData:cart[]|undefined
  orderMsg:string|undefined
  constructor(private product:ProductService, private router:Router){}
  orderNow(data:{email:string,address:string,contact:string}){

    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user)[0].id
    if(this.totalPrice){
      let orderData:order = {
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }
      this.cartData?.forEach((item)=>{
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
        }, 600);
         
      })
      this.product.orderNow(orderData).subscribe((result)=>{

        if(result){
          this.orderMsg = "Your order has been placed"
          setTimeout(() => {
            this.router.navigate(['my-orders'])
            this.orderMsg = undefined
          }, 4000);
         
        }
      })
    }
   
  }

  
  ngOnInit(){
    this.product.currentCart().subscribe((result)=>{

      if(result){
        
        let price = 0
        result.forEach((item)=>{
          if(item.quantity){
            price = price + (+item.price* +item.quantity)
          }
          
        })
        this.totalPrice = price + (price/10) + 100-(price/10)
      }

    })
  }


}
