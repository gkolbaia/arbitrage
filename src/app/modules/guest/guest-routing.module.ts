import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CaseRegistrationComponent } from './case-registration/case-registration.component';
import { GuestComponent } from './guest.component';
const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      { path: '', redirectTo: 'case-registration', pathMatch: 'full' },
      {
        path: 'case-registration',
        component: CaseRegistrationComponent,
      },
      {
        path: 'auth',
        component: AuthComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule {}
