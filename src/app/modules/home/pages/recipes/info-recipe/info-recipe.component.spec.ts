import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRecipeComponent } from './info-recipe.component';

describe('InfoRecipeComponent', () => {
  let component: InfoRecipeComponent;
  let fixture: ComponentFixture<InfoRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
