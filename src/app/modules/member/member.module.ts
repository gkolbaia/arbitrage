import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/modules/material/material/material.module';
import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { UmComponent } from './pages/um/um.component';
import { AddEmployeeDialogComponent } from './pages/um/dialogs/add-employee-dialog/add-employee-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkSpaceComponent } from './pages/work-space/work-space.component';
import { CasesTableComponent } from './pages/work-space/components/cases-table/cases-table.component';
import { AddCaseDialogComponent } from './pages/work-space/components/add-case-dialog/add-case-dialog.component';

@NgModule({
  declarations: [UmComponent, MemberComponent, AddEmployeeDialogComponent, WorkSpaceComponent, CasesTableComponent, AddCaseDialogComponent],
  imports: [
    MemberRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class MemberModule {}
