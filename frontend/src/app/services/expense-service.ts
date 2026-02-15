import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

interface ApiResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = `${environment.apiUrl}/expenses`;

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<ApiResponse<Expense[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getExpense(id: number): Observable<Expense> {
    return this.http.get<ApiResponse<Expense>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  createExpense(expense: Partial<Expense>): Observable<Expense> {
    return this.http.post<ApiResponse<Expense>>(this.apiUrl, expense).pipe(
      map(response => response.data)
    );
  }

  updateExpense(id: number, expense: Partial<Expense>): Observable<Expense> {
    return this.http.put<ApiResponse<Expense>>(`${this.apiUrl}/${id}`, expense).pipe(
      map(response => response.data)
    );
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
