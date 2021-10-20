import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './modules/shared/components/forbidden/forbidden.component';
import { NotFoundPageComponent } from './modules/shared/components/not-found-page/not-found-page.component';
import { AuthGuard } from './modules/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/member/member.module').then((m) => m.MemberModule),
  },
  {
    path: 'guest',
    loadChildren: () =>
      import('./modules/guest/guest.module').then((m) => m.GuestModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/case-user/case-user.module').then(
        (m) => m.CaseUserModule
      ),
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: '',
    redirectTo: '/guest/case-registration',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
