package com.example.todo.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.todo.mapper.TaskMapper;
import com.example.todo.model.Task;

@Service
public class TaskService {

    private final TaskMapper mapper;

    public TaskService(TaskMapper mapper) {
        this.mapper = mapper;
    }

    public List<Task> findAll() {
        return mapper.findAll();
    }

    public void addTask(Task task) {
        mapper.insertTask(task);
    }

    public void updateTask(Task task) {
        mapper.updateTask(task);
    }

    public void deleteTask(Long id) {
        mapper.deleteTask(id);
    }
}
