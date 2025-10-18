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

  editingID: number | null = null;
  editTitle ='';

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

  startEdit(task: Task){
    if (!task.id) return;
    this.editingID = task.id;
    this.editTitle = task.title;
  }

  cancelEdit(){
    this.editingID = null;
    this.editTitle = '';
  }

  saveTitle(task: Task) {
    if (!task.id) return;

    const title = this.editTitle.trim();
    // 変更なし/空はスキップ
    if (!title || title === task.title) {
      this.cancelEdit();
      return;
    }

    const payload: Task = { ...task, title }; // done も含まれる

    this.taskService.updateTask(payload).subscribe({
      next: () => {
       // ローカル配列を更新（見つかった要素を更新）
       const t = this.tasks.find(x => x.id === task.id);
       if (t) t.title = title;
        this.cancelEdit();
      },
      error: (err) => {
        console.error('update failed', err);
        // 失敗時の挙動（編集は続ける/メッセージ表示など）
        // 例: this.errorMessage = '更新に失敗しました';
     }
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

