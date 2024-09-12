import { Component } from '@angular/core';
import { OrderCardComponent } from "../../components/order-card/order-card.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [OrderCardComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private router: Router) {
    
  }

  navigateTo(route: string) {
    let routeWithPrefix = `/admin/${route}`
    this.router.navigate([routeWithPrefix]);
  }
}
