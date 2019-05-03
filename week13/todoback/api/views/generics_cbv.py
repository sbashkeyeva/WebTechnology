from api.models import TaskList
from api.serializers import TaskListSerializer
from rest_framework import generics
from django.http import Http404
from rest_framework.permissions import IsAuthenticated


class TaskListClass(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return TaskList.objects.for_user(self.request.user)

    def get_serializer_class(self):
        return TaskListSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TaskListDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer

# class TaskListDetail(APIView):

#     def get_object(self, pk):
#         try:
#             return TaskList.objects.get(id=pk)
#         except TaskList.DoesNotExist:
#             raise Http404

#     def get(self, request, pk):
#         taskList = self.get_object(pk)
#         serializer = TaskListSerializer(taskList)
#         return Response(serializer.data)

#     def put(self, request, pk):
#         taskList = self.get_object(pk)
#         serializer = TaskListSerializer(instance=taskList, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors)

#     def delete(self, request, pk):
#         taskList = self.get_object(pk)
#         taskList.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)