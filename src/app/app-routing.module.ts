import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { KissComponent } from './kiss/kiss.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default to login page
  { path: 'login', component: LoginComponent }, // Route for login page
  { path: 'kiss', component: KissComponent },    // Route for kiss page
  { path: "**", redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
