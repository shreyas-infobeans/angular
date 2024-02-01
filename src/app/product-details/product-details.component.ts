import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productDetail:product | undefined
  productQuantity:number = 1
  removeCart = false
  cartData:product|undefined
  constructor(private router:Router,private activateRoute: ActivatedRoute, private product: ProductService){}

  ngOnInit(){
    let query = this.activateRoute.snapshot.paramMap.get('productId')
    //console.log(query)
    query && this.product.getProduct(query).subscribe((result)=>{
          //console.log(result)
          this.productDetail = result

          let cartData = localStorage.getItem('localCart')
          if(query && cartData){
            let items = JSON.parse(cartData)
            items = items.filter((item:product)=> query === item.id.toString())
            if(items.length){
              this.removeCart = true
            }
            else
            {
              this.removeCart = false
            }
          }
          let user = localStorage.getItem('user')
          if(user){
            let userId = user && JSON.parse(user).id
            this.product.getCartList(userId)
            this.product.cartData.subscribe((result)=>{
              let item = result.filter((item:product)=>query?.toString()===item.productId?.toString())
              if(item.length){
                this.cartData = item[0]
                this.removeCart = true
              }
            })
          }
         
    })
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
  }
  handleQuantity(val:string){
   
      if(this.productQuantity<20 && val==='plus'){
        //console.log("sss333")
        this.productQuantity+=1
      }
      else if(this.productQuantity>1 && val==="min"){
        this.productQuantity-=1
      }
  }
  addToCart(){
      if(this.productDetail){
        this.productDetail.quantity = this.productQuantity
        if(!localStorage.getItem('user')){
          console.log(this.productDetail)
          this.product.localAddtoCart(this.productDetail)
        }
        else
        {
          let user = localStorage.getItem('user')
         // console.log("describe")
         // console.log(user)
          let userId = user && JSON.parse(user)[0].id
          let cartData:cart = {...this.productDetail,userId, productId:this.productDetail.id,}
          delete cartData.id
          this.product.addtoCart(cartData).subscribe((result)=>{
            if(result){
              alert('Product added to cart!')
            
              this.product.getCartList(userId)
              this.removeCart = true
            }

          })
        }
      }
  }
  removeFromCart(id:string){
    if(!localStorage.getItem('user'))
    {
      this.product.removeItemFromCart(id)
     
    }
    else
    { 
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        console.log(this.cartData)
        this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{

          if(result){
            this.product.getCartList(userId)
          }
        })
        this.removeCart = false 
    }
    
  }
}
