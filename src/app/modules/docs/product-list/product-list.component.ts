import { Component, OnInit } from '@angular/core';
import { ProductListService } from './product-list.service';
import { Product } from './product-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductListService]
})
export class ProductListComponent implements OnInit {

  productList: Product[] = [];
  quantityAddedList: number[] = [];
  minQty: number = 0;
  maxQty: number = 12;

  constructor(
    private productListService: ProductListService
  ) { }

  ngOnInit(): void {
    this.productList = this.productListService.getProducts();
    // Create initial product added quantity list
    this.productList.forEach(product => this.quantityAddedList.push(0));
  }

  getCartCount(): number {
    return this.quantityAddedList.reduce((totalQty, qty) => {
      totalQty += qty;
      return totalQty;
    }, 0);
  }

  addProduct(index: number): void {
    this.quantityAddedList[index]++;
  }
}
