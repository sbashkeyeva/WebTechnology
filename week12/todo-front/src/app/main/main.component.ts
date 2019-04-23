import { Component, OnInit } from '@angular/core';
import {ITaskList} from '../shared/interfaces/taskList';
import {ProviderService} from '../shared/services/provider.service';
import { ITask } from '../shared/interfaces/task';
import { ITaskDetailed } from '../shared/interfaces/taskDetailed';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']

})
export class MainComponent implements OnInit {
  public taskLists:ITaskList[]=[];
  public task:ITask[]=[];
  public taskList="";
  public taskDetailed:ITaskDetailed;
  public name: any = ''
  constructor(private provider:ProviderService) { 
  }


  ngOnInit() {
    this.provider.getTaskLists().then(res => {
      this.taskLists = res
    });

  }
  getTasksOfTaskList(taskList:ITaskList){
    this.provider.getTasksOfTaskList(taskList.id).then(data=>{
      this.task=data
    }

    )
  }

  getTaskDetailed(task:ITask){
    this.provider.getTaskDetailed(task.id).then(data=>{
      this.taskDetailed=data
      console.log(data)
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

}
