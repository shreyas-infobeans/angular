import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList: product[] | undefined
  productMessage:string = ''
  icon = faTrash  
  editIcon = faEdit
  constructor(private productService: ProductService){}

  ngOnInit(){
    this.productListing()
  }

  productListing(){
    this.productService.productList().subscribe((result)=>{
      console.log(result)
      this.productList = result
  })
  }
  deleteProduct(id:string){
      console.log(id)
      this.productService.deleteProduct(id).subscribe((result)=>{

        if(result){
            this.productMessage = "Product delete successfully"
            this.productListing()
        }

      })
      setTimeout(() => {
        this.productMessage = ''
      }, 3000);
  }
}
