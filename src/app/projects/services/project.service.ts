import { Injectable } from '@angular/core';
import { HttpService } from '../../helpers/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpService: HttpService) { }

  /**
   * Fetches the list of projects (users) from an external API (JSONPlaceholder).
   * 
   * @returns An observable that emits the array of projects (users).
   */
  getProjects() {
    return this.httpService.get<any>('https://jsonplaceholder.typicode.com/users');
  }
}
