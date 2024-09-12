import { Routes } from '@angular/router';
import { FoodsComponent } from './pages/foods/foods.component';
import { AdminComponent } from './pages/admin/admin.component';
import { OrdersComponent } from './pages/admin/orders/orders.component';

export const routes: Routes = [
    { path: '', component: FoodsComponent},
    { 
        path: 'admin', 
        component: AdminComponent,
        children: [
            { path: 'orders', component: OrdersComponent }
        ]
    },
    { path: '', redirectTo: '', pathMatch: "full" },
];
