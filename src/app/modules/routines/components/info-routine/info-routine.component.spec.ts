import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRoutineComponent } from './info-routine.component';

describe('InfoRoutineComponent', () => {
  let component: InfoRoutineComponent;
  let fixture: ComponentFixture<InfoRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRoutineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
