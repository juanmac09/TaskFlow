import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { DeleteDialogComponent } from '../../../helpers/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgClass],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() status: boolean = false;
  @Output() deleteTask = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  /**
   * Opens a dialog for editing the task.
   * The dialog will load the current task's title and status.
   * After the dialog is closed, it updates the title and status if changes are confirmed.
   */
  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '800px',
      height: '650px',
      data: { isEdit: true, title: this.title, completed: this.status }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.title = result.title;
        this.status = result.completed;
      }
    });
  }

  /**
   * Opens a confirmation dialog for deleting the task.
   * If confirmed, emits an event to delete the task based on its ID.
   */
  deleteConfirm(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      height: '320px',
      data: { confirmDelete: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(this.id);
      }
    });
  }
}
