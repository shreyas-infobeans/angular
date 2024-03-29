import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[] | []>()
  constructor(private http: HttpClient) { }

  addProduct(data:product){
    console.log(data)
    return this.http.post("http://localhost:3000/products",data)
  }

  productList(){
    return this.http.get<product[]>("http://localhost:3000/products")
  }

  deleteProduct(id:String){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  
  updateProduct(product: product){
      return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product)
  }
  popularProducts(){
    return this.http.get<product[]>("http://localhost:3000/products?_limit=3")
  }
  trendyProducts(){
    return this.http.get<product[]>("http://localhost:3000/products?_limit=3")
  }
  searchProducts(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }
  localAddtoCart(data:product){

    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if(!localCart){
        localStorage.setItem('localCart',JSON.stringify([data]))
        this.cartData.emit([data])
    }
    else
    {
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData))
      this.cartData.emit(cartData)
    }
   
  }
  removeItemFromCart(productId:String){
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      let items:product[] = JSON.parse(cartData)
      items = items.filter((item:product)=> productId!==item.id)
      localStorage.setItem('localCart',JSON.stringify(items))
      this.cartData.emit(items)
    }
  }
  addtoCart(cartData:cart){
      return this.http.post('http://localhost:3000/cart',cartData)
  }
  getCartList(userId:string){
    console.log(userId)
    let user = localStorage.getItem('user')
   if(user){
    let userId =  JSON.parse(user)[0].id
   }
   console.log(user)
   console.log(userId)
   return this.http.get<product[]>('http://localhost:3000/cart?userId='+userId, 
      {observe:'response'}).subscribe((result)=>{
        if(result && result.body){
          this.cartData.emit(result.body)
        }
        
      })
    
  }
  removeToCart(cartId:string){
    return this.http.delete('http://localhost:3000/cart/'+cartId)
  }

  currentCart(){
    let userStore = localStorage.getItem('user')  
    let userData = userStore && JSON.parse(userStore)[0]
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id)
  }

  orderNow(data:order){

    return this.http.post('http://localhost:3000/orders',data)
  }
  orderList(){
    let userStore = localStorage.getItem('user')  
    let userData = userStore && JSON.parse(userStore)[0]
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+userData.id)
  }
  deleteCartItems(cartId:string){

    return this.http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'}).subscribe((result)=>{
      if(result){
          this.cartData.emit([])
      }
    })

  }
  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)
  }
}
