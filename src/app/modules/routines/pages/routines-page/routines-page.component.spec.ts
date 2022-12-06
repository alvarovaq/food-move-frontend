import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutinesPageComponent } from './routines-page.component';

describe('RoutinesPageComponent', () => {
  let component: RoutinesPageComponent;
  let fixture: ComponentFixture<RoutinesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutinesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutinesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
