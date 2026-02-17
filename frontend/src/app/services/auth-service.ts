import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';


export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user?: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';

  currentUser = signal<User | null>(null);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    if (this.hasToken()) {
      this.loadCurrentUser();
    }
  }

  // Register a new user

  register(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          this.isAuthenticatedSubject.next(true);
          this.loadCurrentUser();
        }
      })
    );
  }

  // login User
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          this.isAuthenticatedSubject.next(true);
          this.loadCurrentUser();
        }
      })
    );
  }

  // Logout User
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(
        () => {
          this.clearToken();
          this.currentUser.set(null);
          this.isAuthenticatedSubject.next(false);
          this.router.navigate(['/login']);
        }
      )
    );
  }

  // get current user Information
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap(user => this.currentUser.set(user))
    );
  }

  // Clear authentication state
  clearAuth(): void {
    this.clearToken();
    this.currentUser.set(null);
    this.isAuthenticatedSubject.next(false);
  }

  // Load cuurent user from API
  private loadCurrentUser(): void {
    if (this.hasToken()) {
      this.getCurrentUser().subscribe({
        error: () => {
          this.clearToken();
          this.isAuthenticatedSubject.next(false);
        }
      });
    }
  }

  // Get token from localstorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Save token to localstorage
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Remove token from localstorage
  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if token exists
  hasToken(): boolean {
    return !!this.getToken();
  }

  // Check is user is authenticated
  isAuthenticated(): boolean {
    return this.hasToken();
  }


}
