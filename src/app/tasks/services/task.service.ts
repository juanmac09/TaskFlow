import { Injectable } from '@angular/core';
import { HttpService } from '../../helpers/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpService: HttpService) { }

  /**
   * Fetches the list of tasks from an external API (JSONPlaceholder).
   * 
   * @returns An observable that emits the array of tasks.
   */
  getTasks() {
    return this.httpService.get<any>('https://jsonplaceholder.typicode.com/todos');
  }
}
