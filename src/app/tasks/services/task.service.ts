import { Injectable } from '@angular/core';
import { HttpService } from '../../helpers/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpService: HttpService) { }

  getTasks(){
    return this.httpService.get<any>('https://jsonplaceholder.typicode.com/todos');
  }
}
