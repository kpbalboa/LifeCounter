import { ComponentFixture, TestBed } from '@angular/core/testing';


import { YouStatsComponent } from './you-stats.component';

describe('YouStatsComponent', () => {
  let component: YouStatsComponent;
  let fixture: ComponentFixture<YouStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
