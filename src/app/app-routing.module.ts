import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard] // Protege la ruta 'home' con el guardia de autenticación
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'product-details/:id',
    loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsPageModule),
    canActivate: [AuthGuard] // Protege la ruta 'product-details' con el guardia de autenticación
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartPageModule),
    canActivate: [AuthGuard] // Protege la ruta 'shopping-cart' con el guardia de autenticación
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'my-products',
    loadChildren: () => import('./my-products/my-products.module').then( m => m.MyProductsPageModule),
    canActivate: [AuthGuard] // Protege la ruta 'product-details' con el guardia de autenticación
  },
  {
    path: 'edit-product/:id',
    loadChildren: () => import('./edit-product/edit-product.module').then( m => m.EditProductPageModule),
    canActivate: [AuthGuard] // Protege la ruta 'product-details' con el guardia de autenticación
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
