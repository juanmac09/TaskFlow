import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private username: string = 'root-123';
  private password: string = 'password';
  private usernameKey: string = 'username';

  constructor(private router: Router) { }

  login(userData:any):boolean{
    if (this.username === userData.username && this.password === userData.password) {
      this.setUsername(userData.username);
      this.router.navigate(['/dashboard']);
      return true;
    }
    else {
      return false;
    }
  }

  setUsername(username:string):void {
    localStorage.setItem(this.usernameKey, username);
  }

  removeUsername():void{
    localStorage.removeItem(this.usernameKey);
  }

  getUsername():string|null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.usernameKey);
    }
    return null;
  }

  logOut():void {
    this.removeUsername();
    this.router.navigate(['/login']);
  }

  isAuthenticated():boolean {
    if (this.getUsername() === null) {
      return false;
    }
    return true;
  }
}
