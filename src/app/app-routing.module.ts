import { BasicModule } from './basic/basic.module';
import { BasicLayoutComponent } from './basic/basic-layout/basic-layout.component';
import { ProfileLayoutComponent } from './profile/components/profile-layout/profile-layout.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuestService } from './shared/middlewares/auth-guest.service';
import { AuthGuardService } from './shared/middlewares/auth-guard.service';


const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [AuthGuestService],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    component: ProfileLayoutComponent,
    canActivate: [AuthGuardService],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: '',
    component: BasicLayoutComponent,
    loadChildren: () => import('./basic/basic.module').then(m => m.BasicModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
