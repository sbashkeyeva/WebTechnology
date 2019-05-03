from django.urls import path
from api import views
# urlpatterns=[
#     # path('task_lists/', views.task_list),
#     # path('task_lists/<int:pk>',views.detailed_task_list),
#     # path('task_lists/<int:pk>/tasks', views.list_of_task_list),
#     # path('tasks/<int:pk>', views.detailed_task)
# ]


urlpatterns = [
    path('task_lists/', views.TaskListClass.as_view()),
    path('task_lists/<int:pk>/', views.TaskListDetail.as_view()),
    path('task_lists/<int:pk>/tasks/', views.tasks_of_task_list),
    path('tasks/<int:pk>/', views.task),
    path('login/', views.login),
    path('logout/', views.logout),
]