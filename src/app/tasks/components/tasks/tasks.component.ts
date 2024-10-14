import { Component } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { NavComponent } from "../../../helpers/nav/nav.component";
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { AlertComponent } from "../../../helpers/alert/alert.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NavComponent, AlertComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: any[] = [];
  projectId:number = 0;
  showErrorAlert = false;
  showSuccessAlert = false
  message = '';
  constructor(private taskService: TaskService, private dialog: MatDialog, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.projectId = parseInt(params['id']);
      this.getTasks(this.projectId);
    });
  }

  /**
   * Fetches tasks based on the project ID.
   * Filters the tasks to only include those associated with the current project.
   * @param id - The ID of the project to fetch tasks for.
   */
  getTasks(id:number) {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.filter((obj: Record<string, any>) => obj['userId'] === id);
      },
      error: (error) => {
        this.message = 'Error al consultar las tareas.';
        this.showErrorAlert = true;
        setTimeout(() => {
          this.message = '';
          this.showErrorAlert = false;
        }, 3000);
      }
    });
  }

  /**
   * Opens a dialog to create a new task.
   * After the dialog is closed, it adds the new task if the result is provided.
   */
  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '800px',  
      height: '550px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTask(result.title, result.completed);
        this.message = 'Tarea creado exitosamente';
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.message = '';
          this.showSuccessAlert = false;
        }, 3000);
      }
    });
  }

  /**
   * Adds a new task to the current task list.
   * It generates a new task ID based on the last task in the list.
   * @param title - The title of the new task.
   * @param completed - The completion status of the new task.
   */
  addTask(title: string, completed: boolean) {
    const lastTask = this.tasks.reduce((max, obj) => (obj.id > max.id ? obj : max), this.tasks[0]);
    
    const id = (lastTask && lastTask.id) ? lastTask.id + 1 : 1;
    const newTask = {
      id: id,
      title: title,
      completed: completed
    };
    
    this.tasks.push(newTask);
  }

  /**
   * Deletes the task with the specified ID.
   * This is triggered when the task deletion event is emitted from the task component.
   * @param id - The ID of the task to delete.
   */
  handleTaskDeleted(id: number): void {
    this.deleteTask(id);
    this.message = 'Tarea eliminada exitosamente';
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.message = '';
          this.showSuccessAlert = false;
        }, 3000);
  }

  /**
   * Removes a task from the task list based on the provided task ID.
   * @param id - The ID of the task to remove.
   */
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(obj => obj.id !== id);
  }
}
