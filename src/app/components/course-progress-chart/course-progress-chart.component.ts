// src/app/components/course-progress-chart/course-progress-chart.component.ts
import { Component, Input, effect, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts'; 
import { CourseProgress } from '../../Services/data.service'; // Adjust path if necessary
import { ThemeService } from '../../Services/theme.service'; // Adjust path if necessary

@Component({
  selector: 'course-progress-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective], 
  template: `
    <div class="dashboard-card">
      <h3>Course Progress Rate</h3>
      <div echarts [options]="chartOptions" class="chart-container"></div>
    </div>
  `,
  // Basic styling for the chart container
  styles: ['.chart-container { height: 300px; }']
})
export class CourseProgressChartComponent implements OnChanges {
  @Input() data: CourseProgress[] = [];
  @Input() filterDistrict: string | null = null;
  
  private themeService = inject(ThemeService);
  chartOptions!: EChartsOption; 

  // Angular Effect to re-run updateChartOptions whenever the theme signal changes
  private chartEffect = effect(() => {
    // Read the current theme to track changes
    this.themeService.theme(); 
    // Only update if data has been loaded
    if (this.data && this.data.length > 0) {
        this.updateChartOptions();
    }
  });

  // Lifecycle hook to react when the @Input data arrives from the parent component
  ngOnChanges(changes: SimpleChanges): void {
      if (changes['data'] && this.data && this.data.length > 0) {
          this.updateChartOptions();
      }
  }

  updateChartOptions(): void {
    const districts = this.data.map(d => d.district);
    const isDark = this.themeService.theme() === 'dark';
    

    const colorRed = this.themeService.getCssVariable('--color-red');
    const colorOrange = this.themeService.getCssVariable('--color-orange');
    const colorGreen = this.themeService.getCssVariable('--color-green');

    // Retrieve colors for theme-dependent elements (axes, text, grid lines)
    const axisColor = this.themeService.getCssVariable('--chart-axis-color'); 
    const textColor = this.themeService.getCssVariable('--text-primary'); 
    const borderColor = this.themeService.getCssVariable('--border-color'); 
    
    // Fallback colors for safety if CSS variables aren't loaded yet
    const fallbackColor = isDark ? '#aaaaaa' : '#666666'; 
    
    this.chartOptions = {
      tooltip: { 
        trigger: 'axis', 
        axisPointer: { type: 'shadow' } 
      },
      
      // FIX 1: Position the Legend CLEARLY above the chart area (as per mockup)
      legend: { 
        data: ['Below', 'Average', 'Good'],
        textStyle: { color: textColor || fallbackColor },
        top: '10px', 
        left: 'center'
      },
      
      // FIX 2: Set the Grid margins to provide space for the Legend and X-Axis labels
      grid: { 
        left: '3%', 
        right: '4%', 
        bottom: '10%', // Space for district names
        top: '20%',    // Space for the legend
        containLabel: true 
      },
      
      // X-Axis Configuration (Category: District Name)
      xAxis: {
        type: 'category',
        // The data array MUST contain only the district names for correct grouping
        data: districts, 
        axisLabel: { 
          color: axisColor || fallbackColor,
          interval: 0, // Show all labels
          align: 'center', // Center labels under the group
        },
        axisLine: { lineStyle: { color: axisColor || fallbackColor } },
        axisTick: { alignWithLabel: true } // Align ticks with labels
      },
      
      // Y-Axis Configuration (Value: Percentage)
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: { formatter: '{value} %', color: axisColor || fallbackColor },
        splitLine: { 
          lineStyle: { 
            color: isDark ? borderColor : '#e0e0e0' 
          } 
        } 
      },
      
      // Series Configuration (The three grouped bars)
      series: [
        { 
          name: 'Below', 
          type: 'bar', 
          // Use barCategoryGap to define space between district groups
          barCategoryGap: '30%', 
          data: this.data.map(d => d.below), 
          // FIX 3: Apply the retrieved color string
          itemStyle: { color: colorRed } 
        },
        { 
          name: 'Average', 
          type: 'bar', 
          barCategoryGap: '30%',
          data: this.data.map(d => d.average), 
          itemStyle: { color: colorOrange } 
        },
        { 
          name: 'Good', 
          type: 'bar', 
          barCategoryGap: '30%',
          data: this.data.map(d => d.good), 
          itemStyle: { color: colorGreen } 
        }
      ]
    };
  }
}