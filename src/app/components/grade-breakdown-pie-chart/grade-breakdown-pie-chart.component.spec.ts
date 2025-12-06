import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeBreakdownPieChartComponent } from './grade-breakdown-pie-chart.component';

describe('GradeBreakdownPieChartComponent', () => {
  let component: GradeBreakdownPieChartComponent;
  let fixture: ComponentFixture<GradeBreakdownPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeBreakdownPieChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradeBreakdownPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
