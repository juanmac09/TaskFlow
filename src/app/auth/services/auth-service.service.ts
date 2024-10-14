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

  /**
   * Authenticates the user based on provided credentials.
   * If the credentials are correct, it sets the username and navigates to the dashboard.
   * @param userData - An object containing username and password.
   * @returns true if authentication is successful, false otherwise.
   */
  login(userData: any): boolean {
    if (this.username === userData.username && this.password === userData.password) {
      this.setUsername(userData.username);
      this.router.navigate(['/dashboard']);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Stores the username in local storage.
   * @param username - The username to be stored.
   */
  setUsername(username: string): void {
    localStorage.setItem(this.usernameKey, username);
  }

  /**
   * Removes the username from local storage.
   */
  removeUsername(): void {
    localStorage.removeItem(this.usernameKey);
  }

  /**
   * Retrieves the username from local storage.
   * @returns The stored username or null if not found.
   */
  getUsername(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.usernameKey);
    }
    return null;
  }

  /**
   * Logs out the user by removing the username and navigating to the login page.
   */
  logOut(): void {
    this.removeUsername();
    this.router.navigate(['/login']);
  }

  /**
   * Checks if the user is authenticated.
   * @returns true if authenticated, false otherwise.
   */
  isAuthenticated(): boolean {
    if (this.getUsername() === null) {
      return false;
    }
    return true;
  }
}
