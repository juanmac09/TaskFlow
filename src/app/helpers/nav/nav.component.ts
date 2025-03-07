import { Component } from '@angular/core';
import { AuthServiceService } from '../../auth/services/auth-service.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private AuthService:AuthServiceService) { }
  menuOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  get menuClass() {
    return this.menuOpen ? '' : 'closed';
  }
  get menuWidth() {
    return this.menuOpen ? '250px' : '60px';
  }


  logOut(){
    this.AuthService.logOut();
  }
 
}
