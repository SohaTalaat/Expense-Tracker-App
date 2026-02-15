import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

interface ApiResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private apiUrl = `${environment.apiUrl}/incomes`;

  constructor(private http: HttpClient) { }

  getIncomes(): Observable<Income[]> {
    return this.http.get<ApiResponse<Income[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getIncome(id: number): Observable<Income> {
    return this.http.get<ApiResponse<Income>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  createIncome(income: Partial<Income>): Observable<Income> {
    return this.http.post<ApiResponse<Income>>(this.apiUrl, income).pipe(
      map(response => response.data)
    );
  }

  updateIncome(id: number, income: Partial<Income>): Observable<Income> {
    return this.http.put<ApiResponse<Income>>(`${this.apiUrl}/${id}`, income).pipe(
      map(response => response.data)
    );
  }

  deleteIncome(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
