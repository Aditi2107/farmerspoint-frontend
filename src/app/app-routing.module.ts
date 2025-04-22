import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmsComponent } from './dashboards/components/farms/farms.component';
import { SchedulesComponent } from './dashboards/components/schedules/schedules.component';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';
import { SuperuserDashboardComponent } from './dashboards/superuser-dashboard/superuser-dashboard.component';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { FarmersComponent } from './dashboards/components/farmers/farmers.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'farms', component: FarmsComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'farmers', component: FarmersComponent },
  // { path: 'admin-dashboard', component: AdminDashboardComponent },
  // { path: 'superuser-dashboard', component: SuperuserDashboardComponent },
  // { path: 'user-dashboard', component: UserDashboardComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'superuser-dashboard',
    component: SuperuserDashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'super' },
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'user' },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },  // wildcard fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
