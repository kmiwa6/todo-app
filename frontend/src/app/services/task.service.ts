import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  /** 一覧取得 */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  /** 追加 */
  addTask(task: Task): Observable<void> {
    return this.http.post<void>(this.apiUrl, task);
  }

  /** ✅ 更新（チェックON/OFF） */
  updateTask(task: Task): Observable<void> {
    if (!task.id) {
      console.warn('⚠ updateTask: idが未定義のため更新できません', task);
      return new Observable<void>();
    }
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, task);
  }

  /** 削除 */
  deleteTask(task : Task):Observable<void>{
    if (!task.id) {
      console.warn('⚠ deleteTask: idが未定義のため削除できません', task);
      return new Observable<void>();
    }
    return this.http.delete<void>(`${this.apiUrl}/${task.id}`)
  }

}

