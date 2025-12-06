import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassStatsChartComponent } from './pass-stats-chart.component';

describe('PassStatsChartComponent', () => {
  let component: PassStatsChartComponent;
  let fixture: ComponentFixture<PassStatsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassStatsChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassStatsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
