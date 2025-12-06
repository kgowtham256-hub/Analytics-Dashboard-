import { Component, Input, effect, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts'; 
import { GradeBreakdown } from '../../Services/data.service';
import { ThemeService } from '../../Services/theme.service';

@Component({
  selector: 'grade-breakdown-pie-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective], 
  template: `
    <div class="dashboard-card chart-row-3-right">
      <h3>Learners Details Breakdown</h3>
      <div echarts [options]="chartOptions" class="chart-container"></div>
    </div>
  `,
  styles: ['.chart-container { height: 300px; }'] 
})
export class GradeBreakdownPieChartComponent implements OnChanges {
  @Input() data: GradeBreakdown[] = [];
  
  private themeService = inject(ThemeService);
  chartOptions!: EChartsOption; 

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['data'] && this.data && this.data.length > 0) {
          this.updateChartOptions();
      }
  }
  
  private chartEffect = effect(() => {
    this.themeService.theme(); 
    if (this.data && this.data.length > 0) {
        this.updateChartOptions();
    }
  });
    
  updateChartOptions(): void {
    if (!this.data || this.data.length === 0) return;

    const textColor = this.themeService.getCssVariable('--text-primary'); 
    
    // Map grades to retrieved colors
    const colorMap: { [key: string]: string } = {
      'A': this.themeService.getCssVariable('--color-blue'),
      'B': this.themeService.getCssVariable('--color-green'),
      'C': this.themeService.getCssVariable('--color-teal'),
      'D': this.themeService.getCssVariable('--color-orange'),
      'E': this.themeService.getCssVariable('--color-pink'),
    };
    // ------------------------------------------------------------------


    const chartData = this.data.map(item => ({
      value: item.percent,
      name: item.label,
      itemStyle: { color: colorMap[item.grade] } 
    }));

    this.chartOptions = {
      tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
      
      // Legend Configuration
      legend: { 
        orient: 'vertical',
        left: '60%', 
        top: 'center', 
        data: chartData.map(d => d.name),
        textStyle: { color: textColor } 
      },
      
      series: [
        {
          name: 'Grade Distribution',
          type: 'pie',
          radius: '70%', // Full pie chart
          center: ['30%', '50%'],
          data: chartData,
          label: {
            show: true,
            formatter: '{d}%',
            // 👇 FIX 4: Apply retrieved text color
            color: textColor 
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}