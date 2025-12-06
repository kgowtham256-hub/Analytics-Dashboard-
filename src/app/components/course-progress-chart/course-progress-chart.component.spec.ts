import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProgressChartComponent } from './course-progress-chart.component';

describe('CourseProgressChartComponent', () => {
  let component: CourseProgressChartComponent;
  let fixture: ComponentFixture<CourseProgressChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseProgressChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseProgressChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
