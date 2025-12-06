// src/app/components/summary-cards/summary-cards.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import the type
import { Summary } from '../../Services/data.service';

interface KPISummary {
  label: string;
  value: number;
  icon: string; 
  styleClass: string; 
}

@Component({
  selector: 'summary-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.css']
})
export class SummaryCardsComponent {
  // Receives the summary object from the parent component
  @Input() set summary(data: Summary | null) {
    if (data) {
      this.kpiData = [
        { label: 'Total Learner enrolled', value: data.totalLearners, icon: '👨‍🎓', styleClass: 'total' },
        { label: 'Male', value: data.male, icon: '👨', styleClass: 'male' },
        { label: 'Female', value: data.female, icon: '👩', styleClass: 'female' },
        { label: 'Others', value: data.others, icon: '👤', styleClass: 'others' },
        { label: 'Active Learners', value: data.activeLearners, icon: '💡', styleClass: 'active' },
        { label: 'Engaged Learners', value: data.engagedLearners, icon: '⚡', styleClass: 'engaged' },
      ];
    }
  }

  kpiData: KPISummary[] = [];
}