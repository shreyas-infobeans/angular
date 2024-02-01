import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType:string = ""
  sellerName:string = ''
  userName:string = ''
  searchValue:undefined|product[]
  cartItems = 0
  constructor(private route: Router, private product: ProductService){}
  logout(){
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }
  ngOnInit(){
    
    this.route.events.subscribe((i:any)=>{
      if(i.url){
        if(localStorage.getItem('seller') && i.url.includes("seller")){
            this.menuType = "seller"
            let sellerstore = localStorage.getItem("seller")
            let sellerData  = sellerstore && JSON.parse(sellerstore)[0]
            this.sellerName = sellerData.name
        } else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem("user")
          let userData = userStore && JSON.parse(userStore)
          if(userData.name===undefined)
          {
             userData = userStore && JSON.parse(userStore)[0]
          }
          this.userName = userData.name
          this.menuType = "user"
          this.product.getCartList(userData.id)
        }
        else
        {
          this.menuType = "default"
        }
      }
    })
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartItems = JSON.parse(cartData).length
      console.log("cart:"+this.cartItems)
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems = items.length
    })
  }
  searchProducts(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement
      this.product.searchProducts(element.value).subscribe((result)=>{
          this.searchValue = result
      })
    }
  }
  hideSearch(){
    this.searchValue = undefined
  }
  redirectoDetails(id:string){
    this.route.navigate([`/details/${id}`])
  }
  submitSearch(searchValue:string){
      console.log("hi"+searchValue)
      this.route.navigate([`search/${searchValue}`])
  }
  userLogOut(){
    localStorage.removeItem('user')
    this.route.navigate(['user-auth'])
    this.product.cartData.emit([])
  }
}
