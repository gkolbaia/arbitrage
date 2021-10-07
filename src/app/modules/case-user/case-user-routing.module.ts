import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CaseUserComponent } from './case-user.component';

const routes: Routes = [
  {
    path: '',
    component: CaseUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseUserRoutingModule {}
