// src/app/components/assessment-donut-chart/assessment-donut-chart.component.ts
import { Component, Input, effect, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts'; 
import { AssessmentCompletion } from '../../Services/data.service'; // Adjust path if necessary
import { ThemeService } from '../../Services/theme.service'; // Adjust path if necessary

@Component({
  selector: 'assessment-donut-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective], 
  template: `
    <div class="dashboard-card chart-row-3-left">
      <h3>Average Assessment Score</h3>
      <div echarts [options]="chartOptions" class="chart-container"></div>
    </div>
  `,
  styles: ['.chart-container { height: 300px; }'] 
})
export class AssessmentDonutChartComponent implements OnChanges {
  @Input() data!: AssessmentCompletion;
  
  private themeService = inject(ThemeService);
  chartOptions!: EChartsOption; 

  // Lifecycle hook to handle data input changes
  ngOnChanges(changes: SimpleChanges): void {
      if (changes['data'] && this.data) {
          this.updateChartOptions();
      }
  }

  private chartEffect = effect(() => {
    this.themeService.theme(); 
    if (this.data) {
        this.updateChartOptions();
    }
  });
  
  updateChartOptions(): void {
    if (!this.data) return;

    const colorBlue = this.themeService.getCssVariable('--color-blue');
    const colorOrange = this.themeService.getCssVariable('--color-orange');
    const borderColor = this.themeService.getCssVariable('--border-color');
    const textColor = this.themeService.getCssVariable('--text-primary');

    const chartData = [
      { 
        value: this.data.completedPercent, 
        name: `${this.data.completedPercent}% Assessment completed`,
        itemStyle: { color: colorBlue } 
      },
      { 
        value: this.data.notCompletedPercent, 
        name: `${this.data.notCompletedPercent}% Assessment not completed`,
        itemStyle: { color: colorOrange } 
      }
    ];

    this.chartOptions = {
      tooltip: { trigger: 'item', formatter: '{b}' },
      legend: { show: false },
      
      // Center text annotation
      graphic: {
        type: 'text',
        left: 'center',
        top: '45%',
        style: {
          text: 'All Districts',
          align : 'center',
          verticalAlign: "middle",
          font: '14px Arial',
          fill: textColor
        }
      },

      series: [
        {
          name: 'Assessment Completion',
          type: 'pie',
          radius: ['50%', '70%'], // Inner and outer radius for donut effect
          center: ['50%', '55%'], 
          data: chartData,
          label: {
            show: true,
            position: 'outer',
            formatter: '{b}',
            color: textColor
          },
        }
      ]
    };
  }
}