import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/modules/material/material.module';
import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { UmComponent } from './pages/um/um.component';
import { AddEmployeeDialogComponent } from './pages/um/dialogs/add-employee-dialog/add-employee-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkSpaceComponent } from './pages/work-space/work-space.component';
import { CasesTableComponent } from './pages/work-space/components/cases-table/cases-table.component';
import { AddCaseDialogComponent } from './pages/work-space/components/add-case-dialog/add-case-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ChangePasswordDialogComponent } from './pages/user-profile/dialogs/change-password-dialog/change-password-dialog.component';
import { ApproveCaseDialogComponent } from './pages/work-space/components/approve-case-dialog/approve-case-dialog.component';
import { EditCaseDialogComponent } from './pages/work-space/components/edit-case-dialog/edit-case-dialog.component';

@NgModule({
  declarations: [
    UmComponent,
    MemberComponent,
    AddEmployeeDialogComponent,
    WorkSpaceComponent,
    CasesTableComponent,
    AddCaseDialogComponent,
    UserProfileComponent,
    ChangePasswordDialogComponent,
    ApproveCaseDialogComponent,
    EditCaseDialogComponent,
  ],
  imports: [
    MemberRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class MemberModule {}
