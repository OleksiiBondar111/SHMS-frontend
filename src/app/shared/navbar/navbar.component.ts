import {Component, inject, OnInit} from '@angular/core';
import {logout} from "../../auth/store/actions/auth.actions";
import {Store} from "@ngrx/store";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {SidenavbarComponent} from "../sidenavbar/sidenavbar.component";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, MatDialogModule, SidenavbarComponent],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private dialog = inject(MatDialog);

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.store.dispatch(logout());
    // logout();
  }

  openSideBar(): void {
    const dialogRef = this.dialog.open(SidenavbarComponent, {
      data: {message: 'Hello from Standalone Modal!'},
      width: '18rem',
      height: '100vh',
      position: {
        top: '0',
        left: '0'
      }
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {target: 'Start Hosting'},
      width: '40%',
    }).afterClosed().subscribe(resp => {
      if (resp.result == 'Yes') {
        console.log("resp.result: ", resp.result)
      } else {
        console.log("resp.result: ", resp.result)
      }
    });
  }

}
