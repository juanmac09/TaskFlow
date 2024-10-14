import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  dataConfirm: any = {};
  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data = data;
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
