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
}
