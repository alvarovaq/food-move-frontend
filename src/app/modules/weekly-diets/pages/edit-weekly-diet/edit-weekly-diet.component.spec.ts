import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeeklyDietComponent } from './edit-weekly-diet.component';

describe('EditWeeklyDietComponent', () => {
  let component: EditWeeklyDietComponent;
  let fixture: ComponentFixture<EditWeeklyDietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWeeklyDietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWeeklyDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
