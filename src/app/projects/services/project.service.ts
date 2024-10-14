import { Injectable } from '@angular/core';
import { HttpService } from '../../helpers/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpService: HttpService) { }

  getProjects(){
    return this.httpService.get<any>('https://jsonplaceholder.typicode.com/users');
  }
}
