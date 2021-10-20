import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { MaterialModule } from './modules/material/material.module';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FilesTableComponent } from './components/files-table/files-table.component';
import { CaseDetailsComponent } from './components/case-details/case-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
@NgModule({
  declarations: [
    FileUploaderComponent,
    ForbiddenComponent,
    ConfirmationDialogComponent,
    FilesTableComponent,
    CaseDetailsComponent,
    NotFoundPageComponent,
  ],
  imports: [CommonModule, MaterialModule, HttpClientModule, FlexLayoutModule],
  exports: [
    MaterialModule,
    FileUploaderComponent,
    FilesTableComponent,
    CaseDetailsComponent,
  ],
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
