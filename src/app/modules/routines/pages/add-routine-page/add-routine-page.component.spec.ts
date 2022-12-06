import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoutinePageComponent } from './add-routine-page.component';

describe('AddRoutinePageComponent', () => {
  let component: AddRoutinePageComponent;
  let fixture: ComponentFixture<AddRoutinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoutinePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoutinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
