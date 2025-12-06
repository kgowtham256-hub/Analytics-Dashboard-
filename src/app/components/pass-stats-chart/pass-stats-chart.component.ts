// src/app/components/pass-stats-chart/pass-stats-chart.component.ts
import { Component, Input, effect, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts'; 
import { PassStats } from '../../Services/data.service'; // Assuming path is correct
import { ThemeService } from '../../Services/theme.service'; // Assuming path is correct

@Component({
  selector: 'pass-stats-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective], 
  template: `
    <div class="dashboard-card">
      <h3>Pass Percentage</h3>
      <!-- Chart height must be defined in CSS -->
      <div echarts [options]="chartOptions" class="chart-container"></div>
    </div>
  `,
  styles: ['.chart-container { height: 300px; }'] 
})
// 👈 Implement OnChanges to react to data inputs
export class PassStatsChartComponent implements OnChanges {
  @Input() stats!: PassStats;
  
  private themeService = inject(ThemeService);
  chartOptions!: EChartsOption; 

  // Lifecycle hook to handle data input changes
  ngOnChanges(changes: SimpleChanges): void {
      if (changes['stats'] && this.stats) {
          this.updateChartOptions();
      }
  }

  // Effect to handle theme changes
  private chartEffect = effect(() => {
    // Read theme signal to track changes
    this.themeService.theme(); 
    // Only update if data is already loaded
    if (this.stats) {
        this.updateChartOptions();
    }
  });
  
  updateChartOptions(): void {
    if (!this.stats) return;

    // ------------------------------------------------------------------
    // 👇 FIX 1: Retrieve actual color strings using the service utility
    // ------------------------------------------------------------------
    const colorBlue = this.themeService.getCssVariable('--color-blue');
    const colorTeal = this.themeService.getCssVariable('--color-teal');
    const colorGreen = this.themeService.getCssVariable('--color-green');
    const colorRed = this.themeService.getCssVariable('--color-red');
    
    // Retrieve colors for theme-dependent elements
    const axisColor = this.themeService.getCssVariable('--chart-axis-color'); 
    const borderColor = this.themeService.getCssVariable('--border-color'); 
    
    // Fallback colors for safety
    const fallbackColor = '#666'; 
    // ------------------------------------------------------------------

    const categories = ['Overall Learners', 'Assessment taken', 'Passed', 'Failed'];
    const dataValues = [
      this.stats.overallLearners,
      this.stats.assessmentTaken,
      this.stats.passed,
      this.stats.failed
    ];
    
    // The bar colors must use the retrieved hex values
    const barColors = [colorBlue, colorTeal, colorGreen, colorRed];
    
    const isDark = this.themeService.theme() === 'dark';
    
    // Determine the max value for the X-axis (performance axis)
    const maxValue = Math.max(...dataValues) * 1.1; 

    this.chartOptions = {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { show: false },
      
      // Adjust grid to better match mockups
      grid: { left: '1%', right: '5%', bottom: '3%', top: '5%', containLabel: true },
      
      // Y-Axis: Categories (the vertical axis for labels)
      yAxis: {
        type: 'category',
        data: categories,
        inverse: true, // Show 'Overall Learners' at the top
        axisLabel: { color: axisColor || fallbackColor, margin: 10, align: 'right' },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      
      xAxis: {
        type: 'value',
        max: maxValue,
        axisLabel: { formatter: '{value}', color: axisColor || fallbackColor },
        splitLine: { lineStyle: { color: isDark ? borderColor : '#e0e0e0' } }
      },
      
      series: [
        {
          type: 'bar',
          // Set bar height
          barWidth: '70%',
          data: dataValues.map((value, index) => ({
            value: value,
            itemStyle: { color: barColors[index] }
          })),
          showBackground: true,
          backgroundStyle: {
            // Background should adapt to the card color, using a lighter shade of the border color
            color: isDark ? 'rgba(63, 66, 84, 0.4)' : 'rgba(224, 224, 224, 0.4)'
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{c}', // Show the raw value
            color: axisColor || fallbackColor,
            fontWeight: 'bold'
          }
        }
      ]
    };
  }
}