import json
from api.models import Task, TaskList
from api.serializers import TaskSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET', 'POST'])
def tasks_of_task_list(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return Response({'error': str(e)})

    if request.method == 'GET':
        tasks = task_list.task_set.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    if request.method == 'POST':

        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


@api_view(['GET', 'PUT', 'DELETE'])
def task(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist as e:
        return Response({'error': str(e)})

    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=200)
    if request.method == 'PUT':
        data = json.loads(request.body)
        serializer = TaskSerializer(instance=task, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    if request.method == 'DELETE':
        task.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)