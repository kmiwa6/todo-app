package com.example.todo.model;
import lombok.Data;

@Data
public class Task {
    private Long id;
    private String title;
    private Boolean done;
}
