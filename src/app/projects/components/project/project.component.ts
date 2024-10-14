import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../helpers/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { AlertComponent } from "../../../helpers/alert/alert.component";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [AlertComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() deleteProject = new EventEmitter();
  showSuccessAlert = false
  message = '';

  constructor(private dialog: MatDialog, private route: Router) { }

  /**
   * Opens a dialog for editing the project.
   */
  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '800px',
      height: '650px',
      data: { isEdit: true, title: this.title, description: this.description }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.title = result.title;
        this.description = result.description;
        this.message = 'Tarea actualizada exitosamente.';
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.message = '';
          this.showSuccessAlert = false;
        }, 3000);
      }
    });
  }

  /**
   * Opens a confirmation dialog for deleting the project.
   */
  deleteConfirm(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      height: '320px',
      data: { confirmDelete: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject.emit(this.id); // Emit the delete event with the project id
      }
    });
  }

  /**
 * Navigates to the tasks page associated with the current project.
 */
  showTasks(): void {
    this.route.navigate(['tasks', this.id]);
  }


}
