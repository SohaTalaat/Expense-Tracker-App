import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

export interface Income {
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
export class IncomeService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // Clean and simple - interceptor handles authentication!

  getIncomes(): Observable<{ data: Income[] }> {
    return this.http.get<{ data: Income[] }>(this.apiUrl);
  }

  getIncome(id: number): Observable<{ data: Income }> {
    return this.http.get<{ data: Income }>(`${this.apiUrl}/${id}`);
  }

  createIncome(income: Partial<Income>): Observable<{ data: Income }> {
    return this.http.post<{ data: Income }>(this.apiUrl, income);
  }

  updateIncome(id: number, income: Partial<Income>): Observable<{ data: Income }> {
    return this.http.put<{ data: Income }>(`${this.apiUrl}/${id}`, income);
  }

  deleteIncome(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
