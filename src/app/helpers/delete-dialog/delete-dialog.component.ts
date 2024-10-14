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

  /**
   * Confirms the deletion by closing the dialog and passing a `true` value to the parent.
   * This is called when the user confirms they want to delete the item.
   */
  onConfirm() {
    this.dialogRef.close(true);
  }

  /**
   * Cancels the deletion and closes the dialog without passing any data.
   * This is called when the user cancels the delete action.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
