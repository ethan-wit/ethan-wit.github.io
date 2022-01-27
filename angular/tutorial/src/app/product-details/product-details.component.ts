import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, products } from 'src/app/products'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    //This gets information on the route parameters
    const routeParams = this.route.snapshot.paramMap;
    //This gets the product id from the route parameters
    const productIdFromRoute = Number(routeParams.get('productId'));

    //This gets the object (product info) for route product id
    this.product = products.find(product => product.id === productIdFromRoute)

  }

}
