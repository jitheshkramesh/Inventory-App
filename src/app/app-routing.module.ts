import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'products', loadChildren: './products/products.module#ProductsModule' },
  { path: "register", component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
