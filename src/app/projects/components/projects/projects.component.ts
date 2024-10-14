import { Component } from '@angular/core';
import { ProjectComponent } from "../project/project.component";
import { NavComponent } from "../../../helpers/nav/nav.component";
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { AlertComponent } from "../../../helpers/alert/alert.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectComponent, NavComponent, AlertComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: any[] = [];
  showErrorAlert = false;
  showSuccessAlert = false
  message = '';
  constructor(private projectService: ProjectService, private dialog: MatDialog) {
    this.getProject();
  }

  /**
   * Fetches the list of projects from the ProjectService.
   */
  getProject() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        this.message = 'Error al consultar los proyectos.';
        this.showErrorAlert = true;
        setTimeout(() => {
          this.message = '';
          this.showErrorAlert = false;
        }, 3000);
      }
    });
  }

  /**
   * Opens a dialog for creating or editing a project.
   */
  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '800px',
      height: '650px',
      data: { isEdit: false }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addProject(result.title, result.description);
        this.message = 'Proyecto creado exitosamente';
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.message = '';
          this.showSuccessAlert = false;
        }, 3000);
      }
    });
  }

  /**
   * Adds a new project to the projects array.
   * @param title - The title of the new project.
   * @param description - The description of the new project.
   */
  addProject(title: string, description: string) {

    const lastProject = this.projects.reduce((max, obj) => (obj.id > max.id ? obj : max), this.projects[0]);

    const id = (lastProject && lastProject.id) ? lastProject.id + 1 : 1;
    const newProject = {
      id: id,
      name: title,
      email: description
    };

    this.projects.push(newProject);
  }

  /**
   * Handles the deletion of a project by calling the delete method.
   * @param id - The id of the project to be deleted.
   */
  handleProjectDeleted(id: number): void {
    this.deleteProject(id);
    this.message = 'Proyecto eliminado exitosamente';
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.message = '';
      this.showSuccessAlert = false;
    }, 3000);
  }

  /**
   * Deletes a project from the projects array based on the provided id.
   * @param id - The id of the project to be deleted.
   */
  deleteProject(id: number): void {
    this.projects = this.projects.filter(obj => obj.id !== id);
  }
}
