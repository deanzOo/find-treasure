import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLayoutComponent } from './layouts/userLayout/userLayout.component';
import { AdminGuard } from './admin.guard';
import { FullAdminComponent } from './layouts/full-admin/full-admin.component';
import { ADMIN_FULL_ROUTES } from './admin/shared/routes/full-layout.routes';
import { InterestingPointResolver } from './admin/resolvers/interestingPointResolver.resolver';
import { USER_FULL_ROUTES } from './admin/shared/routes/user-layout.routes';
import { ContentAdminComponent } from './layouts/content-admin/content-admin.component';
import { ADMIN_CONTENT_ROUTES } from './admin/shared/routes/content-layout.routes';
import { LoginUserGuard } from './login-user.guard';


const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [LoginUserGuard],
    children: USER_FULL_ROUTES
  },
  {
    path: 'admin',
    component: FullAdminComponent,
    data: { title: 'full Views' },
    canActivate: [AdminGuard],
    children: ADMIN_FULL_ROUTES
  },
  {
    path: 'admin',
    component: ContentAdminComponent,
    data: { title: 'full Views' },
    children: ADMIN_CONTENT_ROUTES
  },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    InterestingPointResolver,
  ]
})
export class AppRoutingModule { }
