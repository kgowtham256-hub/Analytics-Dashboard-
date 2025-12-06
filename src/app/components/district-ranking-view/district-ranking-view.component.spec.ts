import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictRankingViewComponent } from './district-ranking-view.component';

describe('DistrictRankingViewComponent', () => {
  let component: DistrictRankingViewComponent;
  let fixture: ComponentFixture<DistrictRankingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictRankingViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistrictRankingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
