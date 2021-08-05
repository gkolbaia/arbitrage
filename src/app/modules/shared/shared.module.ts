import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { MaterialModule } from './modules/material/material.module';
@NgModule({
  declarations: [],
  imports: [MaterialModule],
  exports: [MaterialModule],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: tokenInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
