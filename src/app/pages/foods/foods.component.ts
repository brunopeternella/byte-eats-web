import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-foods',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css'
})
export class FoodsComponent implements OnInit {
  products!: Product[]

  constructor(private productService: ProductService) {
    
  }

  ngOnInit(): void {
    this.productService.get(1, 100).subscribe({
      next: (response) => this.products = response.items
    })
  }
}
