import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  
  searchResult:undefined|product[]
  constructor(private router:Router, private activateRoute: ActivatedRoute, private product:ProductService){}
  ngOnInit(){
    console.log("in ngoninit")
    let query = this.activateRoute.snapshot.paramMap.get('query')
    console.log(query)
    query && this.product.searchProducts(query).subscribe((result)=>{
      console.log("s")
      console.log(result)
        this.searchResult = result
    })
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
  }
  
}
