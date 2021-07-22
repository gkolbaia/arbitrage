import { NgModule } from '@angular/core';
import { AuthComponent } from './modules/auth/auth.component';
import { AuthModule } from './modules/auth/auth.module';
import { MaterialModule } from './modules/material/material/material.module';
@NgModule({
  declarations: [],
  imports: [MaterialModule, AuthModule],
  exports: [MaterialModule, AuthModule],
})
export class SharedModule {}
