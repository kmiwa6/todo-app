package com.example.todo.controller;

import com.example.todo.model.Task;
import com.example.todo.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService service;

    @GetMapping
    public List<Task> findAll() {
        return service.findAll();
    }

    @PostMapping
    public void add(@RequestBody Task task) {
        service.addTask(task);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody Task task) {
        task.setId(id);
        service.updateTask(task);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteTask(id);
    }
}
