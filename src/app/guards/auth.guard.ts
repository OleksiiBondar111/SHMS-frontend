import {CanActivate, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {selectToken} from "../auth.selectors";
import {map, take} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    if(!environment.production){
      return of(true);
    }
    return this.store.select(selectToken).pipe(
      take(1),
      map((token) => {
        if (token) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
