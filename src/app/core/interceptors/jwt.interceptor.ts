import { HttpRequest, HttpEvent, HttpHandlerFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { environment } from "src/environments/environment";

export function jwtInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const authService = inject(AuthService);
  const user = authService.getUser();
  const isLoggedIn = user?.access;
  const isApiUrl = request.url.startsWith(environment.apiUrl) && !request.url.includes("login");
  if (isLoggedIn && isApiUrl) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${user.access}`,
        "Content-Type": "application/json",
      },
    });
  }

  return next(request);
}
