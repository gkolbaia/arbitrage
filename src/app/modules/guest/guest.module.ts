import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest.component';
import { GuestRoutingModule } from './guest-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material/material/material.module';

@NgModule({
  declarations: [GuestComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class GuestModule {}
