package com.example.todo.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.example.todo.model.Task;

@Mapper
public interface TaskMapper {
    List<Task> findAll();

    void insertTask(Task task);

    void updateTask(Task task);

    void deleteTask(Task task);

}
