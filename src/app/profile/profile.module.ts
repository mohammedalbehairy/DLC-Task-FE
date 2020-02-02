import { PostsService } from './services/posts.service';
import { UsersService } from './services/users.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ListComponent } from './components/posts/list/list.component';
import { CreateComponent } from './components/posts/create/create.component';
import { EditComponent } from './components/posts/edit/edit.component';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { DetailsComponent } from './components/posts/details/details.component';
import { DetailsUserComponent } from './components/users/details-user/details-user.component';


@NgModule({
  declarations: [ListComponent, CreateComponent, EditComponent, ProfileLayoutComponent, CreateUserComponent, EditUserComponent, ListUsersComponent, DetailsComponent, DetailsUserComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
