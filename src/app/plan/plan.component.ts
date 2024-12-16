import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ModalComponent} from "../shared/modal/modal.component";

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ModalComponent],
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent {
  private dialog = inject(MatDialog);

  openModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {message: 'Hello from Standalone Modal!'},
      width: '40%',
    });
  }

}
