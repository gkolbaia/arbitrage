import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { UmComponent } from './pages/um/um.component';
import { WorkSpaceComponent } from './pages/work-space/work-space.component';
const routes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: [
      { path: '', redirectTo: 'um', pathMatch: 'full' },
      {
        path: 'um',
        component: UmComponent,
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
