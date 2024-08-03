import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { MainComponent } from './components/main/main.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { SiteDataComponent } from './components/site-data/site-data.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SubscribersComponent } from './components/subscribers/subscribers.component';
import { ProductsComponent } from './components/products/products.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'main', component: MainComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'subscribers', component: SubscribersComponent },
      { path: 'site-data', component: SiteDataComponent },
      { path: 'trainers', component: TrainersComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
