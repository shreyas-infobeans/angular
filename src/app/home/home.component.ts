import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts:undefined | product[]
  trendyProducts:undefined | product[]
  constructor(private product: ProductService){}

  ngOnInit(){

    this.product.popularProducts().subscribe((result)=>{

      console.log(result)
      this.popularProducts = result

    })
    this.product.trendyProducts().subscribe((result)=>{

      console.log(result)
      this.trendyProducts = result

    })
  }
}
