import {selectToken} from "../auth.selectors";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthState} from "../auth/store/reducers/auth.reducer";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {switchMap} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authURls = [environment.URL + "/auth/register", environment.URL + "/auth/authenticate"];

  constructor(private store: Store<AuthState>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authURls.includes(request.url)) {
      console.log("intercept request.url: ", request.url)
      return next.handle(request);
    }
    return this.store.select(selectToken).pipe(
      switchMap((token: string | null) => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        return next.handle(request);
      })
    );
  }
}
