import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material/material.module';
import { CaseRegistrationComponent } from './case-registration/case-registration.component';
import { AuthComponent } from './auth/auth.component';
import { GuestComponent } from './guest.component';

@NgModule({
  declarations: [GuestComponent, CaseRegistrationComponent, AuthComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  exports: [GuestRoutingModule],
})
export class GuestModule {}
