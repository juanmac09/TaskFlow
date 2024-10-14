import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../helpers/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'] 
})
export class ProjectComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() deleteProject = new EventEmitter();

  constructor(private dialog: MatDialog) {}

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
}
