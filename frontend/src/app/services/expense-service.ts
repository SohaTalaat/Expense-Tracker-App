import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

export interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
  notes?: string;
  category_id?: number;
  category?: any;
  user_id: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // All methods automatically have Authorization header attached by interceptor!

  getExpenses(): Observable<{ data: Expense[] }> {
    return this.http.get<{ data: Expense[] }>(this.apiUrl);
  }

  getExpense(id: number): Observable<{ data: Expense }> {
    return this.http.get<{ data: Expense }>(`${this.apiUrl}/${id}`);
  }

  createExpense(expense: Partial<Expense>): Observable<{ data: Expense }> {
    return this.http.post<{ data: Expense }>(this.apiUrl, expense);
  }

  updateExpense(id: number, expense: Partial<Expense>): Observable<{ data: Expense }> {
    return this.http.put<{ data: Expense }>(`${this.apiUrl}/${id}`, expense);
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
