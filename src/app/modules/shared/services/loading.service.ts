import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading = new EventEmitter<boolean>();
  jobChangeing = new BehaviorSubject(true);
  loadingOn() {
    this.loading.emit(true);
  }
  loadingOff() {
    this.loading.emit(false);
  }
  changeJob(arg: any) {
    this.jobChangeing.next(arg);
  }
}
