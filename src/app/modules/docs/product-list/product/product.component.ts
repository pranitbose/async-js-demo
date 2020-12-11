import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../product-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Input('quantityAdded') quantityAddedList: number[];
  @Input() minQty: number;
  @Input() maxQty: number;
  @Input() index: number;

  @Output() productAdded = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  addProduct(index: number): void {
    // this.quantityAddedList[index]++;
    this.productAdded.next(index);
  }

  decrement(index: number): void {
    if (this.quantityAddedList[index] <= this.minQty) return;
    this.quantityAddedList[index]--;
  }

  increment(index: number): void {
    if (this.quantityAddedList[index] >= this.maxQty) return;
    this.quantityAddedList[index]++;
  }
}
