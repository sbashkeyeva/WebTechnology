import {Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {ITaskList} from '../interfaces/taskList';
import {ITask} from '../interfaces/task';
import {ITaskDetailed} from '../interfaces/taskDetailed';
import {ITaskCreate} from '../interfaces/taskCreate';
import {IAuthResponse} from '../interfaces/auth';
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
      return this.get('http://127.0.0.1:8000/api/task_lists/'+id+'/tasks/',{})
  }
  getTaskDetailed(id:number): Promise<ITaskDetailed>{
      return this.get('http://127.0.0.1:8000/api/tasks/'+id+'/',{})
  }
  
  createTaskList(name: any): Promise<ITaskList> {
    return this.post('http://127.0.0.1:8000/api/task_lists/', {
      name: name
    });
  }
  updateTaskList(taskList:ITaskList){
    return this.put("http://127.0.0.1:8000/api/task_lists/" + taskList.id+'/' ,{
      name:taskList.name
    })
  }
  deleteTaskList(id:number):Promise<any>{
    return this.delet("http://127.0.0.1:8000/api/task_lists/" + id+'/' ,{
    })
  }
  deleteTask(id:number):Promise<any>{
    return this.delet('http://127.0.0.1:8000/api/tasks/'+id+'/',{})
  }
  updateTask(task:ITaskDetailed){
    return this.put('http://127.0.0.1:8000/api/tasks/'+task.id+'/',{
      name:task.name,
      status:task.status
    })
  }
  createTask(task:ITaskCreate,id:number){
    return this.post('http://127.0.0.1:8000/api/task_lists/'+id+'/tasks/',{
      name:task.name,
      status:task.status,
      task_list:id,
      created_at:task.created_at,
      due_on:task.due_on

    })
  }
  auth(login: any, password: any): Promise<IAuthResponse> {
    return this.post("http://127.0.0.1:8000/api/login/", {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post("http://localhost:8000/api/logout/", {});
  }

}