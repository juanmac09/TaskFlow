import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { ProjectsComponent } from "./projects/components/projects/projects.component";
import { TasksComponent } from "./tasks/components/tasks/tasks.component";
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from './projects/components/project-dialog/project-dialog.component';
import { TaskDialogComponent } from './tasks/components/task-dialog/task-dialog.component';
import { DeleteDialogComponent } from './helpers/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjectsComponent, TasksComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '800px',  // Ancho del modal
      height: '650px', // Altura del modal
      data: { isEdit: false } // Cambia a true si deseas editar un proyecto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes manejar el resultado del formulario
        console.log('Proyecto creado o editado:', result);
      }
    });
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '100px',  // Ancho del modal
      height: '650px', // Altura del modal
      data: { isEdit: true } // Cambia a true si deseas editar un proyecto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes manejar el resultado del formulario
        console.log('Tarea creada o editada:', result);
      }
    });
  }


  deleteConfirm(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',  // Ancho del modal
      height: '320px', // Altura del modal
      data: { confirmDelete:true  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes manejar el resultado del formulario
        console.log('Tarea creada o editada:', result);
      }
    });
  }
}
