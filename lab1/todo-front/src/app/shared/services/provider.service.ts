import {Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {ITaskList} from '../interfaces/taskList';
import {ITask} from '../interfaces/task';
import {ITaskDetailed} from '../interfaces/taskDetailed';
@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }

  getTaskLists(): Promise<ITaskList[]> {
    return this.get('http://127.0.0.1:8000/api/task_lists/', {});
  }
  getTasksOfTaskList(id:number): Promise<ITask[]>{
      return this.get('http://127.0.0.1:8000/api/task_lists/'+id+'/tasks',{})
  }
  getTaskDetailed(id:number): Promise<ITaskDetailed>{
      return this.get('http://127.0.0.1:8000/api/tasks/'+id,{})
  }
  createTaskList(name: any): Promise<ITaskList> {
    return this.post('http://127.0.0.1:8000/api/task_lists/', {
      name: name
    });
  }  

//   getCategoryProducts(id: number): Promise<IProduct[]> {
//     return this.get(`http://localhost:8000/shop/categories/${id}/products/`, {});
//   }

}