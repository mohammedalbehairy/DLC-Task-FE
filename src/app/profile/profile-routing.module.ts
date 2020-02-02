import { DetailsComponent } from './components/posts/details/details.component';
import { DetailsUserComponent } from './components/users/details-user/details-user.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { EditComponent } from './components/posts/edit/edit.component';
import { CreateComponent } from './components/posts/create/create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/posts/list/list.component';
import { AdminGuardService } from '../shared/middlewares/admin-guard.service';


const routes: Routes = [
  {
    path: 'list-posts',
    component: ListComponent,
  },
  {
    path: 'create-post',
    component: CreateComponent,
  },
  {
    path: 'edit-post/:id',
    component: EditComponent,
  },
  {
    path: 'details-post/:id',
    component: DetailsComponent,
  },
  {
    path: 'list-users',
    component: ListUsersComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'details-user/:id',
    component: DetailsUserComponent,
    canActivate: [AdminGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
