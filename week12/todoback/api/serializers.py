from rest_framework import serializers
from api.models import Task, TaskList


class TaskSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
    created = serializers.DateTimeField()
    due_on = serializers.DateTimeField()
    status = serializers.DateTimeField()

    def create(self, validated_data):
        task = Task(**validated_data)
        task.save()
        return task

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class TaskListSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.name = validated_data.get('name', instance.name)
        return instance

    def create(self, validated_data):
        taskList = TaskList(**validated_data)
        taskList.save()
        return taskList


class TaskModelSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'name')


class TaskListModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskList
        fields = '__all__'
