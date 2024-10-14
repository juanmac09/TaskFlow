import { Component } from '@angular/core';
import { ProjectComponent } from "../project/project.component";
import { NavComponent } from "../../../helpers/nav/nav.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectComponent, NavComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

}
