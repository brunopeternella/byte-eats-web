import { Component, Input } from '@angular/core';
import { CardModalComponent } from './card-details/card-details.component';
import { ModalComponent } from "../../base/modal/modal.component";
import { Product } from '../../models/product';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModalComponent, ModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() product!: Product;

  showCardDetails = false;

  openCardDetais() {
    this.showCardDetails = true;
  }

  closeCartDetails() {
    this.showCardDetails = false;
  }
}
