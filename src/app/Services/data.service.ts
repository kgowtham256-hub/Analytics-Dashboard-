// src/app/core/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define all required types (shortened for brevity here)
export interface Summary {
    totalLearners: number; male: number; female: number; others: number; activeLearners: number; engagedLearners: number;
}
export interface CourseProgress { district: string; below: number; average: number; good: number; }
export interface PassStats { overallLearners: number; assessmentTaken: number; passed: number; failed: number; }
export interface AssessmentCompletion { completedPercent: number; notCompletedPercent: number; }
export interface GradeBreakdown { grade: string; label: string; percent: number; }
export interface DistrictRankingDistrict { district: string; rank: number; enrolled: number; male: number; female: number; others: number; passed: number; assessmentCompleted: number; completionRatePercent: number; }

export interface DashboardData {
    summary: Summary;
    courseProgress: CourseProgress[];
    passStats: PassStats;
    assessmentCompletion: AssessmentCompletion;
    gradeBreakdown: GradeBreakdown[];
    districtRanking: {
        rankBy: string;
        districts: DistrictRankingDistrict[];
    };
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getDashboardData(year: 2024 | 2025): Observable<DashboardData> {
    const fileName = `dashboard_${year}.json`;
    // Fetches from src/assets/data/
    return this.http.get<any>("/assets/data/"+fileName);
  }
}