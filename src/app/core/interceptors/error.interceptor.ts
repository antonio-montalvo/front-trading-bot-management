import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        console.error('[HTTP 403] Acceso denegado:', req.url);
      } else if (error.status >= 500) {
        console.error(`[HTTP ${error.status}] Error del servidor:`, req.url);
      }
      return throwError(() => error);
    })
  );
};
