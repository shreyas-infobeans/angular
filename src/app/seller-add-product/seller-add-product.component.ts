import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:string = ''
  constructor(private productService: ProductService){}
  submit(data:product){
      this.productService.addProduct(data).subscribe((result) =>{

        console.log(result)
        if(result){
         
            this.addProductMessage = "Product added successfully"
         
        }
       
        setTimeout(() => {
          this.addProductMessage = ""
        }, 2000);
       
      })
  }
}
