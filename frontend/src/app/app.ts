import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  private taskService = inject(TaskService);
  tasks: Task[] = [];
  newTask = '';

  ngOnInit() {
    this.load();
  }

  load() {
    this.taskService.getTasks().subscribe(data => (this.tasks = data));
  }

  addTask() {
    if (!this.newTask.trim()) return;
    const task: Task = { title: this.newTask, done: false };
    this.taskService.addTask(task).subscribe(() => {
      this.newTask = '';
      this.load();
    });
  }

  deleteTask(task:Task){
    if (!confirm(`「${task.title}」を削除しますか？`)) return;
    this.taskService.deleteTask(task).subscribe(() => this.load());
  }

  toggleDone(task: Task) {
    console.log('✅ toggleDone called:', task);
    this.taskService.updateTask(task).subscribe(() => this.load());
  }
}

