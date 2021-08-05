import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/shared/modules/auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/member/member.module').then((m) => m.MemberModule),
  },
  {
    path: 'guest',
    loadChildren: () =>
      import('./modules/guest/guest.module').then((m) => m.GuestModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
