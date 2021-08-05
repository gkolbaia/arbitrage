import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/guest/case-registration',
    pathMatch: 'full',
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
