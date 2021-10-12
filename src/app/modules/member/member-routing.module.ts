import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminGuard } from '../shared/guards/super-admin.guard';
import { MemberComponent } from './member.component';
import { UmComponent } from './pages/um/um.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { WorkSpaceComponent } from './pages/work-space/work-space.component';
const routes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: [
      // { path: '', redirectTo: 'um', pathMatch: 'full' },
      {
        path: 'um',
        component: UmComponent,
        canActivate: [SuperAdminGuard],
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'work',
        component: WorkSpaceComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule {}
