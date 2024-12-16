import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss'],
  //   animations: [
  //   trigger('fadeInOut', [
  //     state('in', style({opacity: 1, transform: 'scale(1)'})),
  //     transition(':enter', [
  //       style({opacity: 0, transform: 'scale(0.8)'}),
  //       animate('300ms ease-out'),
  //     ]),
  //     transition(':leave', [
  //       animate('300ms ease-in', style({opacity: 0, transform: 'scale(0.8)'})),
  //     ]),
  //   ]),
  // ],
})
export class SidenavbarComponent {
  private dialog = inject(MatDialog);
}
