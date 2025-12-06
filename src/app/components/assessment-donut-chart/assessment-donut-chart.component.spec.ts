import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDonutChartComponent } from './assessment-donut-chart.component';

describe('AssessmentDonutChartComponent', () => {
  let component: AssessmentDonutChartComponent;
  let fixture: ComponentFixture<AssessmentDonutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentDonutChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentDonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
