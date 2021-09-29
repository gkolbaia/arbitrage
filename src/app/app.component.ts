import { Component } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { LoadingService } from './modules/shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading = false;

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  constructor(private _loadingService: LoadingService) {
    this._loadingService.loading.subscribe((res) => {
      this.loading = res;
    });
  }
  title = 'arbitrage-app';
}
