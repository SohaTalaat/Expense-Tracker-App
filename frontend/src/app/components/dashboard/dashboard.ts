import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ExpenseService, Expense } from '../../services/expense-service';
import { IncomeService, Income } from '../../services/income-service';
import { CategoryService, Category } from '../../services/category-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  totalIncome = signal(0);
  totalExpenses = signal(0);
  balance = signal(0);
  categoryCount = signal(0);
  isLoading = signal(true);

  recentExpenses = signal<Expense[]>([]);
  recentIncomes = signal<Income[]>([]);

  constructor(
    public authService: AuthService,
    private expenseService: ExpenseService,
    private incomeService: IncomeService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading.set(true);

    // Load user if not loaded
    if (!this.authService.currentUser()) {
      this.authService.getCurrentUser().subscribe();
    }

    // Load expenses
    this.expenseService.getExpenses().subscribe({
      next: (expenses) => {
        this.recentExpenses.set(expenses.slice(0, 5));
        const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
        this.totalExpenses.set(total);
        this.updateBalance();
      },
      error: (err) => console.error('Error loading expenses:', err)
    });

    // Load incomes
    this.incomeService.getIncomes().subscribe({
      next: (incomes) => {
        this.recentIncomes.set(incomes.slice(0, 5));
        const total = incomes.reduce((sum, inc) => sum + Number(inc.amount), 0);
        this.totalIncome.set(total);
        this.updateBalance();
      },
      error: (err) => console.error('Error loading incomes:', err)
    });

    // Load categories
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categoryCount.set(categories.length);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.isLoading.set(false);
      }
    });
  }

  updateBalance(): void {
    this.balance.set(this.totalIncome() - this.totalExpenses());
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout().subscribe();
    }
  }
}
