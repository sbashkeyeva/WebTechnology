from django.shortcuts import render
from .models import TaskList, Task
from django.http import JsonResponse


def task_list(request):
    task_list = TaskList.objects.all()
    task_list_json = [i.to_json() for i in task_list]
    return JsonResponse(task_list_json, safe=False)


def detailed_task_list(request, pk):
    try:
        task = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False)
    return JsonResponse(task.to_json())


def list_of_task_list(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
        tasks=task_list.task_set.all()
    except TaskList.DoesNotExist as e:
        return  JsonResponse({'error':str(e)},safe=False)
    json_tasks=[i.to_json() for i in tasks]
    return JsonResponse(json_tasks, safe=False)


def detailed_task(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist as e:
        return JsonResponse({'error':str(e)}, safe=False)
    return JsonResponse(task.to_json_detailed())