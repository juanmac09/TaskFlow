import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { ProjectsComponent } from './projects/components/projects/projects.component';
import { authGuard } from './auth/guards/auth.guard';
import { authenticatedGuard } from './auth/guards/authenticated.guard';
import { TasksComponent } from './tasks/components/tasks/tasks.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent,canActivate: [authenticatedGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component:ProjectsComponent,canActivate: [authGuard]},
    { path: 'tasks/:id', component:TasksComponent,canActivate: [authGuard]}
];
