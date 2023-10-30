import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestLoaderService {
  private requestCount = 0;
  public isLoading = new BehaviorSubject<boolean>(false);

  showLoader(): void {
    this.requestCount++;
    this.isLoading.next(true);
  }

  hideLoader(): void {
    if (this.requestCount > 0) {
      this.requestCount--;
    }
    if (this.requestCount === 0) {
      this.isLoading.next(false);
    }
  }
}
