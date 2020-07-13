import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';
import { FormLauncherComponent } from './launcher/form-launcher/form-launcher.component';
import { LaunchPlanComponent } from './launcher/launch-plan/launch-plan.component';
import { LauncherComponent } from './launcher/launcher.component';
import { FormUserComponent } from './user/form-user/form-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: FormUserComponent,
    canActivate: [AuthGuard],
    // children: [
    //   {
    //     path: ':id',
    //     component: FormUserComponent
    //   }
    // ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'launchplan',
    component: LauncherComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: FormLauncherComponent
      }
    ]
  },
  // {
  //   path: 'admin',
  //   loadChildren: './user/user.module#UserModule',
  // },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
