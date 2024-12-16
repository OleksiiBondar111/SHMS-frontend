import {Inject, Injectable, NgZone} from '@angular/core';
import {filter, mapTo, switchMap} from "rxjs/operators";
import {fromEvent, merge, Observable, timer} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {Store} from "@ngrx/store";
import {logout} from "../auth/store/actions/auth.actions";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {
  private userActivity$: Observable<any>;
  private inactivityTimeout = 5000; // 5 minutes

  constructor(private store: Store, @Inject(DOCUMENT) private document: Document, private ngZone: NgZone, private router: Router) {
    // Monitor user activity across various events
    this.userActivity$ = merge(
      fromEvent(this.document, 'mousemove'),
      fromEvent(this.document, 'keydown'),
      fromEvent(this.document, 'mousedown'),
      fromEvent(this.document, 'touchstart')
    );
  }

  startMonitoring() {
    // Use NgZone to run the timer outside Angular to prevent unnecessary change detection cycles
    this.ngZone.runOutsideAngular(() => {
      this.userActivity$
        .pipe(
          filter(() => !this.isLoginPage()),
          switchMap(() => {
            // Reset the timer whenever there is user activity
            return timer(this.inactivityTimeout).pipe(mapTo(true));
          })
        )
        .subscribe(() => {
          // Log the user out if there has been no activity for the timeout period
          this.ngZone.run(() => {
            this.logoutUser();
          });
        });
    });
  }

  private logoutUser() {
    this.store.dispatch(logout());
    alert('You have been logged out due to inactivity.');
  }

  private isLoginPage(): boolean {
    return this.router.url === '/login'; // Adjust if your login path is different
  }

}
