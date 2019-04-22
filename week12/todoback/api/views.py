from django.shortcuts import render
from .models import TaskList, Task
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .serializers import TaskListSerializer, TaskModelSerializer
import json


@csrf_exempt
def task_list(request):
    if request.method=='GET':
        task_list=TaskList.objects.all()
        serializer=TaskListSerializer(task_list,many=True)
        return JsonResponse(serializer.data,safe=False)
    elif request.method=='POST':
        body=json.loads(request.body)
        serializer=TaskListSerializer(data=body)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse({'error':'bad request'})


@csrf_exempt
def detailed_task_list(request, pk):
    try:
        task = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False)
    if request.method=='GET':
        serializer=TaskListSerializer(task_list)
        return JsonResponse(serializer.data)
    elif request.method=='PUT':
        body=json.loads(request.body)
        serializer=TaskListSerializer(data=body, instance=task)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse({'error':'bad request'})
    elif request.method=='DELETE':
        task.delete()
        return JsonResponse({})
    return JsonResponse({'error':'bad request'})

@csrf_exempt
def list_of_task_list(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
        tasks=task_list.task_set.all()
        serializer = TaskModelSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False)
    except TaskList.DoesNotExist as e:
        return  JsonResponse({'error':str(e)},safe=False)

@csrf_exempt
def detailed_task(request, pk):
    try:
        task = Task.objects.get(id=pk)
        serializer=TaskModelSerializer(task)
        return JsonResponse(serializer.data)
    except Task.DoesNotExist as e:
        return JsonResponse({'error':str(e)}, safe=False)