import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendstatsComponent } from './friendstats.component';

describe('FriendstatsComponent', () => {
  let component: FriendstatsComponent;
  let fixture: ComponentFixture<FriendstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendstatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
