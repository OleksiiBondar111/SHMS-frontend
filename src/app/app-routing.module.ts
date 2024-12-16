import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard";
import {PackageComponent} from "./package/package.component";
import {CustomerComponent} from "./customer/customer.component";
import {TestScssComponent} from "./shared/test-scss/test-scss.component";
import {LoginFormComponent} from "./auth/login/login-form/login-form.component";

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'test', component: TestScssComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Use the guard to protect the route
  { path: 'packages', component: PackageComponent, canActivate: [AuthGuard] }, // Use the guard to protect the route
  { path: 'customers', component: CustomerComponent, canActivate: [AuthGuard] }, // Use the guard to protect the route
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: '**', redirectTo: '/login' }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
