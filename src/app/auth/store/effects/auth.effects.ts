import {Injectable} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {login, loginFailure, loginSuccess, logout} from "../actions/auth.actions";
import {catchError, map, switchMap, take, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {AutoLogoutService} from "../../../services/auto-logout.service";
import {from, of} from "rxjs";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private autoLogoutService: AutoLogoutService,
              private router: Router) {
  }

// mergeMap vs switchMap ???
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      tap((l) => console.log("actions$: ", l)),
      // take(1),
      switchMap(action =>
        from(this.authService.authenticate(action.username, action.password)).pipe(
          tap((r) => console.log("login$", r)),
          map(response => loginSuccess({access_token: response.access_token})),
          catchError(error => of(loginFailure({error: error.message})))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        take(1),
        tap(() => {
          // this.autoLogoutService.startMonitoring();
          console.log("login success");
          this.router.navigate(['/dashboard']); // Navigate to the dashboard on successful login
        })
      ),
    {dispatch: false}
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          console.log("logOut$ success");
          this.router.navigate(['/login']); // Navigate to the dashboard on successful login
        })
      ),
    {dispatch: false}
  );
}
