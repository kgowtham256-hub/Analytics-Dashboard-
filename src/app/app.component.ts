// src/app/app.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// --- Import all standalone components ---
import { SummaryCardsComponent } from './components/summary-cards/summary-cards.component';
import { CourseProgressChartComponent } from './components/course-progress-chart/course-progress-chart.component';
import { PassStatsChartComponent } from './components/pass-stats-chart/pass-stats-chart.component';
import { AssessmentDonutChartComponent } from './components/assessment-donut-chart/assessment-donut-chart.component';
import { GradeBreakdownPieChartComponent } from './components/grade-breakdown-pie-chart/grade-breakdown-pie-chart.component';
import { DistrictRankingViewComponent } from './components/district-ranking-view/district-ranking-view.component';
import { DataService, DashboardData } from './Services/data.service';
import { ThemeService } from './Services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule, 
    FormsModule,
    SummaryCardsComponent,
    CourseProgressChartComponent,
    PassStatsChartComponent,
    AssessmentDonutChartComponent,
    GradeBreakdownPieChartComponent,
    DistrictRankingViewComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private dataService = inject(DataService);
  themeService = inject(ThemeService);

  dashboardData: DashboardData | null = null;
  selectedYear: 2024 | 2025 = 2024;
  selectedPeriod: 'Monthly' | 'Quarterly' = 'Quarterly';
  selectedDistrict: string = 'All District';
  
  districtOptions: string[] = [
    'All District', 'Ariyulur', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri',
    'Dindigul', 'Erode', 'Kallakurichi', 'Karur', 'Madurai'
  ];

  ngOnInit(): void {
    // 👈 Call the loading function when the component initializes
    this.loadData();
  }

  // 👈 Function to handle data fetching from the service
  loadData(): void {
    this.dataService.getDashboardData(this.selectedYear).subscribe({
      next: (data) => {
        this.dashboardData = data;
        console.log('Dashboard Data Loaded:', data); // Verification check
      },
      error: (err) => console.error('Failed to load dashboard data', err)
    });
  }

  onYearChange(year: 2024 | 2025): void {
    this.selectedYear = year;
    // 👈 Reload data when the year filter changes
    this.loadData();
  }

  // loadData(): void {
  //   this.dataService.getDashboardData(this.selectedYear).subscribe({
  //     next: (data) => this.dashboardData = data,
  //     error: (err) => console.error('Failed to load dashboard data', err)
  //   });
  // }

  // onYearChange(year: 2024 | 2025): void {
  //   this.selectedYear = year;
  //   this.loadData();
  // }

  onDistrictChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedDistrict = selectElement.value;
    // Note: Filtering logic needs to be implemented in each chart component (optional step)
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}