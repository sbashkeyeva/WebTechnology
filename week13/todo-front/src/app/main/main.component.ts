import { Component, OnInit } from '@angular/core';
import {ITaskList} from '../shared/interfaces/taskList';
import {ProviderService} from '../shared/services/provider.service';
import { ITask } from '../shared/interfaces/task';
import { ITaskDetailed } from '../shared/interfaces/taskDetailed';
import {ITaskCreate} from '../shared/interfaces/taskCreate';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']

})
export class MainComponent implements OnInit {
  public taskLists:ITaskList[]=[];
  public task:ITask[]=[];
  public taskCreate:ITaskCreate = {
    name : "",
    status: "",
    created_at: "2014-04-03T04:33:16Z",
    due_on: "2019-04-03T02:10:00Z"
  };
  public taskList="";
  public taskListId = 0;
  public taskDetailed:ITaskDetailed;
  public name: any = ''
  public showTasks=false
  public showTask=false
  public showCreateTask=false
  public logged = false;
  public login: any = "";
  public password: any = "";
  constructor(private provider:ProviderService) { 
  }


  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      this.logged = true;
    }
    if (this.logged) {
      this.provider.getTaskLists().then(res => {
        this.taskLists = res;
      });
    }

  }
  getTasksOfTaskList(taskList:ITaskList){
    this.provider.getTasksOfTaskList(taskList.id).then(data=>{
      this.showTasks=true
      this.showTask=false
      this.taskListId = taskList.id
      this.showCreateTask=true
      console.log(this.taskListId);
      this.task=data
    }

    )
  }

  getTaskDetailed(task:ITask){
    this.provider.getTaskDetailed(task.id).then(data=>{
      this.showTask=true
      this.taskDetailed=data
      
    }

    )
  }

  createTaskList() {
    if (this.name !== '') {
      this.provider.createTaskList(this.name).then(res => {
        this.taskLists.push(res);
        this.name = "";
      })
    }
  }
  updateTaskList(taskList:ITaskList){
    this.provider.updateTaskList(taskList).then(res=>{})
  }
  deleteTaskList(taskList:ITaskList){
    this.provider.deleteTaskList(taskList.id).then(res=>{
      this.provider.getTaskLists().then(data=>{
        this.taskLists=data
      })
    })
  }
  deleteTask(task:ITaskDetailed){
    this.provider.deleteTask(task.id).then(res=>{
      this.showTask=false
      this.taskDetailed.id=0;
      this.taskDetailed.name = '';
      this.taskDetailed.created_at='';
      this.taskDetailed.due_on='';
      this.taskDetailed.status='';
    })
    
  }
  updateTask(task:ITaskDetailed){
    this.provider.updateTask(task).then(res=>{
      
    })
  }
  createTask(){
    this.provider.createTask(this.taskCreate, this.taskListId).then(res=>{

    })
  }
  auth() {
    if (this.login !== "" && this.password !== "") {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem("token", res.token);
        this.logged = true;
        this.provider.getTaskLists().then(res => {
          this.taskLists = res;
        });
      });
    }
  }
  clearData() {
    this.taskLists = [];
    this.showTasks = false;
    this.showTask = false;
    this.taskList = "";
    this.login = "";
    this.password = "";
    this.taskListId = null;
  }
  logout() {
    this.provider.logout().then(res => {
      localStorage.clear();
      this.logged = false;
      this.clearData();
    });
  }

}
