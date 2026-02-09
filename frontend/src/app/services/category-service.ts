
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

export interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
  description?: string;
  user_id: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // Get all categories - No need to pass headers!
  getCategories(): Observable<{ data: Category[] }> {
    return this.http.get<{ data: Category[] }>(this.apiUrl);
  }

  // Get single category - No need to pass headers!
  getCategory(id: number): Observable<{ data: Category }> {
    return this.http.get<{ data: Category }>(`${this.apiUrl}/${id}`);
  }

  // Create category - No need to pass headers!
  createCategory(category: Partial<Category>): Observable<{ data: Category }> {
    return this.http.post<{ data: Category }>(this.apiUrl, category);
  }

  // Update category - No need to pass headers!
  updateCategory(id: number, category: Partial<Category>): Observable<{ data: Category }> {
    return this.http.put<{ data: Category }>(`${this.apiUrl}/${id}`, category);
  }

  // Delete category - No need to pass headers!
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
