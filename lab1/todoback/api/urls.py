from django.urls import path
from api import views
urlpatterns=[
    path('task_lists/', views.task_list),
    path('task_lists/<int:pk>',views.detailed_task_list),
    path('task_lists/<int:pk>/tasks', views.list_of_task_list),
    path('tasks/<int:pk>', views.detailed_task)
]