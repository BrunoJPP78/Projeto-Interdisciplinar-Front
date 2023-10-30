import { inject } from "@angular/core";
import { HttpEvent, HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { RequestLoaderService } from "../services/request-loader.service";

export function spinnerInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const requestLoaderService = inject(RequestLoaderService);
  requestLoaderService.showLoader();
  return next(request).pipe(
    finalize(() => {
      requestLoaderService.hideLoader();
    })
  );
}
