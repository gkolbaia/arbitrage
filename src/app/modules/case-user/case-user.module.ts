import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material/material.module';
import { CaseUserRoutingModule } from './case-user-routing.module';
import { CaseUserComponent } from './case-user.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CaseUserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CaseUserRoutingModule,
    SharedModule,
  ],
})
export class CaseUserModule {}
