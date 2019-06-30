import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productservice: ProductService) { }

  ngOnInit() {
    let id = + this.route.snapshot.params['id'];

    this.productservice.getProductById(id).subscribe(result => this.product = result);
  }

}
