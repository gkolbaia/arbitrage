import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material/material.module';
import { CaseRegistrationComponent } from './case-registration/case-registration.component';
import { AuthComponent } from './auth/auth.component';
import { GuestComponent } from './guest.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AnswerSheetComponent } from './answer-sheet/answer-sheet.component';
import { ReportFormComponent } from './case-registration/components/report-form/report-form.component';

@NgModule({
  declarations: [GuestComponent, CaseRegistrationComponent, AuthComponent, AnswerSheetComponent, ReportFormComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [GuestRoutingModule],
})
export class GuestModule {}
