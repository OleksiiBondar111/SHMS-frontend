import {Component, Inject, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RouterLink],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 1, transform: 'scale(1)'})),
      transition(':enter', [
        style({opacity: 0, transform: 'scale(0.8)'}),
        animate('300ms ease-out'),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({opacity: 0, transform: 'scale(0.8)'})),
      ]),
    ]),
  ],
})

export class ModalComponent {
  private dialogRef = inject(MatDialogRef<ModalComponent>);
  @Inject(MAT_DIALOG_DATA) public data: any

  onConfirm(): void {
    console.log("onConfirm()");
    this.dialogRef.close({result: 'Yes'});
  }

  onClose(): void {
    console.log("onClose()");
    this.dialogRef.close({result: 'No'});
  }
}
