import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from "./url.interceptor";
import { AuthInterceptor } from "./Auth.Interceptor";
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: UrlInterceptor },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor },
];
